# PowerShell script to create the full Apsara AI frontend structure (Expo/React Native)
# All .tsx are files, not folders

$frontend = "packages/frontend"

# Core config files (do not overwrite if exist)
$files = @(
    "app.json", "babel.config.js", "metro.config.js", "package.json", "tsconfig.json", "eas.json", "global.css"
)
foreach ($f in $files) {
    $p = Join-Path $frontend $f
    if (-not (Test-Path $p)) { New-Item -ItemType File -Path $p | Out-Null }
}

# Helper to create a .tsx file if it doesn't exist
function New-TsxFile($path) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType File -Path $path | Out-Null
    }
}

# --- app/ (Expo Router) ---
$app = "$frontend/app"
$null = New-Item -ItemType Directory -Path $app -Force
New-TsxFile "$app/_layout.tsx"
New-TsxFile "$app/index.tsx"
New-TsxFile "$app/[not-found].tsx"

# Route groups
$groups = @(
    @{ name = "(auth)"; files = @('_layout.tsx','login.tsx','register.tsx','forgot-password.tsx','verify.tsx') },
    @{ name = "(onboarding)"; files = @('_layout.tsx','intro.tsx','tutorial.tsx','permissions.tsx','complete.tsx') },
    @{ name = "(main)"; files = @('_layout.tsx','home.tsx','feed.tsx','explore.tsx','notifications.tsx') }
)
foreach ($g in $groups) {
    $dir = "$app/$($g.name)"
    $null = New-Item -ItemType Directory -Path $dir -Force
    foreach ($f in $g.files) { New-TsxFile "$dir/$f" }
}

# Chat
$chat = "$app/chat"
$null = New-Item -ItemType Directory -Path $chat -Force
New-TsxFile "$chat/_layout.tsx"
New-TsxFile "$chat/index.tsx"
New-TsxFile "$chat/[id].tsx"
$chatId = "$chat/[id]"
$null = New-Item -ItemType Directory -Path $chatId -Force
New-TsxFile "$chatId/details.tsx"
New-TsxFile "$chat/search.tsx"
New-TsxFile "$chat/settings.tsx"
New-TsxFile "$chat/voice-input.tsx"
New-TsxFile "$chat/file-upload.tsx"

# Profile
$profile = "$app/profile"
$null = New-Item -ItemType Directory -Path $profile -Force
New-TsxFile "$profile/_layout.tsx"
New-TsxFile "$profile/index.tsx"
New-TsxFile "$profile/edit.tsx"
New-TsxFile "$profile/password.tsx"
New-TsxFile "$profile/settings.tsx"

# AI
$ai = "$app/ai"
$null = New-Item -ItemType Directory -Path $ai -Force
New-TsxFile "$ai/_layout.tsx"
New-TsxFile "$ai/index.tsx"
New-TsxFile "$ai/settings.tsx"
New-TsxFile "$ai/prompts.tsx"

# Settings
$settings = "$app/settings"
$null = New-Item -ItemType Directory -Path $settings -Force
New-TsxFile "$settings/_layout.tsx"
New-TsxFile "$settings/index.tsx"
New-TsxFile "$settings/theme.tsx"
New-TsxFile "$settings/notifications.tsx"
New-TsxFile "$settings/privacy.tsx"
New-TsxFile "$settings/terms.tsx"
New-TsxFile "$settings/about.tsx"
New-TsxFile "$settings/support.tsx"

# --- components/ ---
$components = "$frontend/components"
$null = New-Item -ItemType Directory -Path $components -Force
$compGroups = @(
    @{ name = "common"; files = @('Button.tsx','Input.tsx','Loader.tsx','Modal.tsx','Avatar.tsx','ThemeToggle.tsx','ErrorBoundary.tsx') },
    @{ name = "layout"; files = @('Header.tsx','TabBar.tsx','SafeAreaWrapper.tsx','ContentWrapper.tsx') },
    @{ name = "chat"; files = @('ChatBubble.tsx','MessageInput.tsx','TypingIndicator.tsx','ChatHeader.tsx','ChatList.tsx','MessageAttachment.tsx') },
    @{ name = "auth"; files = @('LoginForm.tsx','RegisterForm.tsx','OTPInput.tsx') },
    @{ name = "profile"; files = @('ProfileHeader.tsx','ProfileForm.tsx') },
    @{ name = "ai"; files = @('AIResponseCard.tsx','PromptSuggestions.tsx','AIModelSelector.tsx') }
)
foreach ($cg in $compGroups) {
    $dir = "$components/$($cg.name)"
    $null = New-Item -ItemType Directory -Path $dir -Force
    foreach ($f in $cg.files) { New-TsxFile "$dir/$f" }
}

# --- contexts/ ---
$contexts = "$frontend/contexts"
$null = New-Item -ItemType Directory -Path $contexts -Force
$contextFiles = @('AuthContext.tsx','ThemeContext.tsx','ChatContext.tsx','AIContext.tsx')
foreach ($f in $contextFiles) { New-TsxFile "$contexts/$f" }

# --- hooks/ ---
$hooks = "$frontend/hooks"
$null = New-Item -ItemType Directory -Path $hooks -Force
$hookFiles = @('useAuth.ts','useChat.ts','useTheme.ts','useVoiceInput.ts','useFileUpload.ts','useAppState.ts','useNotifications.ts','useAI.ts')
foreach ($f in $hookFiles) { New-TsxFile "$hooks/$f" }

# --- assets/ ---
$assets = "$frontend/assets"
$null = New-Item -ItemType Directory -Path $assets -Force
$null = New-Item -ItemType Directory -Path "$assets/fonts" -Force
$null = New-Item -ItemType Directory -Path "$assets/images/onboarding" -Force
$null = New-Item -ItemType Directory -Path "$assets/animations" -Force
New-TsxFile "$assets/fonts/Inter-Regular.ttf"
New-TsxFile "$assets/images/logo.png"
New-TsxFile "$assets/images/splash-background.jpg"
New-TsxFile "$assets/animations/loading.json"

# --- services/ ---
$services = "$frontend/services"
$null = New-Item -ItemType Directory -Path $services -Force
$null = New-Item -ItemType Directory -Path "$services/api" -Force
$null = New-Item -ItemType Directory -Path "$services/openai" -Force
$null = New-Item -ItemType Directory -Path "$services/storage" -Force
$apiFiles = @('axiosConfig.ts','auth.ts','chat.ts','user.ts','ai.ts')
foreach ($f in $apiFiles) { New-TsxFile "$services/api/$f" }
$openaiFiles = @('client.ts','prompts.ts','contextBuilder.ts')
foreach ($f in $openaiFiles) { New-TsxFile "$services/openai/$f" }
$storageFiles = @('secureStorage.ts','fileStorage.ts')
foreach ($f in $storageFiles) { New-TsxFile "$services/storage/$f" }

# --- store/ ---
$store = "$frontend/store"
$null = New-Item -ItemType Directory -Path $store -Force
New-TsxFile "$store/index.ts"
$null = New-Item -ItemType Directory -Path "$store/slices" -Force
$sliceFiles = @('authSlice.ts','chatSlice.ts','themeSlice.ts','aiSlice.ts')
foreach ($f in $sliceFiles) { New-TsxFile "$store/slices/$f" }

# --- utils/ ---
$utils = "$frontend/utils"
$null = New-Item -ItemType Directory -Path $utils -Force
$utilFiles = @('constants.ts','validators.ts','analytics.ts','permissions.ts','errorReporting.ts','logger.ts')
foreach ($f in $utilFiles) { New-TsxFile "$utils/$f" }

# --- config/ ---
$config = "$frontend/config"
$null = New-Item -ItemType Directory -Path $config -Force
New-TsxFile "$config/index.ts"
New-TsxFile "$config/env.ts"

# --- themes/ ---
$themes = "$frontend/themes"
$null = New-Item -ItemType Directory -Path $themes -Force
New-TsxFile "$themes/ThemeProvider.tsx"
New-TsxFile "$themes/light.ts"
New-TsxFile "$themes/dark.ts"

# --- animations/ ---
$animations = "$frontend/animations"
$null = New-Item -ItemType Directory -Path $animations -Force
New-TsxFile "$animations/transitions.ts"
New-TsxFile "$animations/animations.ts"

# --- device/ ---
$device = "$frontend/device"
$null = New-Item -ItemType Directory -Path $device -Force
$deviceFiles = @('voice.ts','fileUpload.ts','haptics.ts','notifications.ts','geolocation.ts')
foreach ($f in $deviceFiles) { New-TsxFile "$device/$f" }

Write-Host "Apsara AI frontend structure created. All .tsx are files, not folders."