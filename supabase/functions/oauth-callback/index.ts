import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const error = url.searchParams.get('error')

    // If user denied access
    if (error) {
      return Response.redirect(`${Deno.env.get('APP_URL')}/app/add-account?error=${error}`)
    }

    if (!code || !state) {
      throw new Error('Missing code or state parameter')
    }

    // Parse state (format: "platform:userId")
    const [platform, userId] = state.split(':')

    // Exchange code for tokens based on platform
    let tokenData: any
    let profileData: any

    if (platform === 'youtube') {
      // Exchange code for Google OAuth tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
          client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
          redirect_uri: `${Deno.env.get('SUPABASE_URL')}/functions/v1/oauth-callback`,
          grant_type: 'authorization_code',
        }),
      })

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text()
        console.error('Token exchange failed:', errorText)
        throw new Error('Failed to exchange code for tokens')
      }

      tokenData = await tokenResponse.json()

      // Fetch YouTube channel info
      const channelResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      )

      if (!channelResponse.ok) {
        throw new Error('Failed to fetch YouTube channel info')
      }

      const channelData = await channelResponse.json()
      const channel = channelData.items?.[0]

      if (!channel) {
        throw new Error('No YouTube channel found')
      }

      profileData = {
        platform_user_id: channel.id,
        platform_username: channel.snippet.customUrl || channel.snippet.title,
        platform_display_name: channel.snippet.title,
        platform_avatar_url: channel.snippet.thumbnails?.default?.url,
        followers_count: parseInt(channel.statistics?.subscriberCount || '0'),
      }
    } else if (platform === 'pinterest') {
      // Pinterest OAuth flow (placeholder)
      throw new Error('Pinterest OAuth not yet implemented')
    } else {
      throw new Error(`Unsupported platform: ${platform}`)
    }

    // Store tokens in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null

    const { error: dbError } = await supabase
      .from('connected_accounts')
      .upsert({
        user_id: userId,
        platform,
        platform_user_id: profileData.platform_user_id,
        platform_username: profileData.platform_username,
        platform_display_name: profileData.platform_display_name,
        platform_avatar_url: profileData.platform_avatar_url,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        token_expires_at: expiresAt,
        scopes: tokenData.scope?.split(' ') || [],
        followers_count: profileData.followers_count || 0,
        is_active: true,
      }, {
        onConflict: 'user_id,platform'
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save account connection')
    }

    // Redirect back to app
    return Response.redirect(`${Deno.env.get('APP_URL')}/app/add-account?success=true&platform=${platform}`)

  } catch (error) {
    console.error('OAuth callback error:', error)
    return Response.redirect(`${Deno.env.get('APP_URL')}/app/add-account?error=${encodeURIComponent(error.message)}`)
  }
})
