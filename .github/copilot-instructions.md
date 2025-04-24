# Comprehensive Apsara AI Full-Stack Project Structure

"Apsara AI," a professional AI chatbot akin to ChatGPT using Expo Go for mobile development and Node.js/Express for the backend. This document outlines the project structure, including both frontend and backend components, ensuring a clean and maintainable codebase.
note : I use terminal bash to run the project

# Project Structure Overview

Breakdown of a fully integrated AI project structure with both frontend and backend components in a single unified repository.

## Root Directory

```
ApsaraAI/
├── README.md                    # Project documentation, setup instructions
├── package.json                 # Root dependencies and workspace configuration
├── lerna.json                   # Monorepo management configuration
├── tsconfig.json                # Shared TypeScript configuration
├── .eslintrc.js                 # Unified code style rules
├── .prettierrc                  # Code formatting configuration
├── jest.config.js               # Test framework configuration
├── .env                         # Shared environment variables
├── .env.production              # Production environment variables
├── .gitignore                   # Files excluded from Git
├── docker-compose.yml           # Development environment orchestration
├── Dockerfile.backend           # Backend container definition
├── Dockerfile.frontend          # Frontend container definition
├── .github/
│   └── workflows/
│       ├── ci.yml               # Continuous integration pipeline
│       └── deployment.yml       # Automated deployment workflow
├── docs/                        # Project documentation
│   ├── api/                     # API documentation
│   ├── architecture/            # System design documents
│   └── user-guides/             # End-user documentation
└── packages/                    # Monorepo packages
    ├── common/                  # Shared code between frontend and backend
    ├── frontend/                # Mobile application (Expo)
    └── backend/                 # API server (Node.js/Express)

```

## Common Package (`/packages/common/`)

```
common/
├── package.json                 # Common package dependencies
├── tsconfig.json                # TypeScript config for shared code
├── src/
│   ├── types/                   # Shared TypeScript interfaces and types
│   │   ├── api.ts               # API request/response types
│   │   ├── auth.ts              # Authentication types
│   │   ├── user.ts              # User data models
│   │   ├── chat.ts              # Chat and message types
│   │   └── ai.ts                # AI response types
│   ├── constants/               # Shared constants
│   │   ├── apiEndpoints.ts      # API route definitions
│   │   ├── errorCodes.ts        # Error code constants
│   │   └── validation.ts        # Validation constants
│   ├── utils/                   # Shared utility functions
│   │   ├── formatting.ts        # Date and text formatting
│   │   ├── validation.ts        # Input validation functions
│   │   └── security.ts          # Security utilities
│   └── schemas/                 # Validation schemas
│       ├── userSchema.ts        # User data validation
│       ├── chatSchema.ts        # Chat data validation
│       └── authSchema.ts        # Authentication validation
└── dist/                        # Build output directory

```

## Frontend Package (`/packages/client/`)

```
client/
├── app.json                     # Expo configuration
├── babel.config.js              # Babel configuration for transpilation
├── metro.config.js              # Metro bundler configuration
├── package.json
├── tsconfig.json                configuration
├── eas.json                     # EAS Build configuration
├── global.css                   # Global CSS for NativeWind
├── app/                         # Expo Router app directory (replaces traditional src structure)
│   ├── _layout.tsx              # Root layout with providers and global UI elements
│   ├── index.tsx                # Home screen (entry point)
│   ├── [not-found].tsx          # 404 not found screen
│   ├── (auth)/                  # Authentication route group
│   │   ├── _layout.tsx          # Auth layout with authentication state providers
│   │   ├── login.tsx            # Login screen
│   │   ├── register.tsx         # Registration screen
│   │   ├── forgot-password.tsx  # Password recovery screen
│   │   └── verify.tsx           # OTP verification screen
│   ├── (onboarding)/            # Onboarding route group
│   │   ├── _layout.tsx          # Onboarding layout
│   │   ├── intro.tsx            # Intro screen
│   │   ├── tutorial.tsx         # Feature tutorial screen
│   │   ├── permissions.tsx      # Permissions screen
│   │   └── complete.tsx         # Completion screen
│   ├── (main)/                  # Main app route group
│   │   ├── _layout.tsx          # Main layout with bottom tab navigation
│   │   ├── home.tsx             # Home dashboard screen
│   │   ├── feed.tsx             # Content feed screen
│   │   ├── explore.tsx          # Explore content screen
│   │   └── notifications.tsx    # Notifications screen
│   ├── chat/                    # Chat routes
│   │   ├── _layout.tsx          # Chat layout with chat context provider
│   │   ├── index.tsx            # Chat list screen
│   │   ├── [id].tsx             # Dynamic chat conversation screen
│   │   ├── [id]/details.tsx     # Chat details screen (nested route)
│   │   ├── search.tsx           # Chat search screen
│   │   ├── settings.tsx         # Chat settings screen
│   │   ├── voice-input.tsx      # Voice message recording screen
│   │   └── file-upload.tsx      # File attachment screen
│   ├── profile/                 # Profile routes
│   │   ├── _layout.tsx          # Profile layout
│   │   ├── index.tsx            # Profile display screen
│   │   ├── edit.tsx             # Edit profile screen
│   │   ├── password.tsx         # Change password screen
│   │   └── settings.tsx         # User settings screen
│   ├── ai/                      # AI routes
│   │   ├── _layout.tsx          # AI layout with AI context provider
│   │   ├── index.tsx            # Main AI assistant screen
│   │   ├── settings.tsx         # AI settings screen
│   │   └── prompts.tsx          # Saved prompts library screen
│   └── settings/                # App settings routes
│       ├── _layout.tsx          # Settings layout
│       ├── index.tsx            # Main settings screen
│       ├── theme.tsx            # Theme settings screen
│       ├── notifications.tsx    # Notification settings screen
│       ├── privacy.tsx          # Privacy policy screen
│       ├── terms.tsx            # Terms of service screen
│       ├── about.tsx            # About app screen
│       └── support.tsx          # Help and support screen
├── components/                  # Reusable UI components
│   ├── common/                  # Generic UI components
│   │   ├── Button.tsx           # Custom button component
│   │   ├── Input.tsx            # Form input component
│   │   ├── Loader.tsx           # Loading indicator
│   │   ├── Modal.tsx            # Modal dialog component
│   │   ├── Avatar.tsx           # User avatar component
│   │   ├── ThemeToggle.tsx      # Light/dark mode switch
│   │   └── ErrorBoundary.tsx    # React error handler
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # App header component
│   │   ├── TabBar.tsx           # Custom bottom tab bar
│   │   ├── SafeAreaWrapper.tsx  # Device-safe container
│   │   └── ContentWrapper.tsx   # Content container with styling
│   ├── chat/                    # Chat-specific components
│   │   ├── ChatBubble.tsx       # Message bubble component
│   │   ├── MessageInput.tsx     # Chat input field
│   │   ├── TypingIndicator.tsx  # "User is typing" indicator
│   │   ├── ChatHeader.tsx       # Chat screen header
│   │   ├── ChatList.tsx         # List of conversations
│   │   └── MessageAttachment.tsx # File/image attachments
│   ├── auth/                    # Authentication components
│   │   ├── LoginForm.tsx        # Login form
│   │   ├── RegisterForm.tsx     # Registration form
│   │   └── OTPInput.tsx         # One-time password input
│   ├── profile/                 # User profile components
│   │   ├── ProfileHeader.tsx    # Profile info display
│   │   └── ProfileForm.tsx      # Profile editing form
│   └── ai/                      # AI-specific components
│       ├── AIResponseCard.tsx   # AI response display
│       ├── PromptSuggestions.tsx # Suggested prompts
│       └── AIModelSelector.tsx  # AI model selection
├── contexts/                    # React Context providers
│   ├── AuthContext.tsx          # Authentication state and methods
│   ├── ThemeContext.tsx         # Theme management
│   ├── ChatContext.tsx          # Chat state and methods
│   └── AIContext.tsx            # AI model settings
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts               # Authentication utilities
│   ├── useChat.ts               # Chat functionality
│   ├── useTheme.ts              # Theme utilities
│   ├── useVoiceInput.ts         # Voice recognition
│   ├── useFileUpload.ts         # File upload utilities
│   ├── useAppState.ts           # App lifecycle monitoring
│   ├── useNotifications.ts      # Push notification handling
│   └── useAI.ts                 # AI interaction utilities
├── assets/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   │   └── Inter-Regular.ttf
│   ├── images/                  # Image assets
│   │   ├── logo.png
│   │   ├── splash-background.jpg
│   │   └── onboarding/          # Onboarding images
│   └── animations/              # Lottie animation files
│       └── loading.json
├── services/                    # External service integrations
│   ├── api/                     # API communication
│   │   ├── axiosConfig.ts       # HTTP client setup
│   │   ├── auth.ts              # Authentication API
│   │   ├── chat.ts              # Chat API
│   │   ├── user.ts              # User profile API
│   │   └── ai.ts                # AI service API
│   ├── openai/                  # OpenAI integration
│   │   ├── client.ts            # OpenAI API client
│   │   ├── prompts.ts           # Prompt templates
│   │   └── contextBuilder.ts    # Context preparation
│   └── storage/                 # Local storage
│       ├── secureStorage.ts     # Encrypted storage
│       └── fileStorage.ts       # Local file handling
├── store/                       # State management
│   ├── index.ts                 # Store configuration
│   └── slices/                  # State slices
│       ├── authSlice.ts         # Authentication state
│       ├── chatSlice.ts         # Chat state
│       ├── themeSlice.ts        # Theme preferences
│       └── aiSlice.ts           # AI settings state
├── utils/                       # Utility functions
│   ├── constants.ts             # App constants
│   ├── validators.ts            # Form validation
│   ├── analytics.ts             # Usage analytics
│   ├── permissions.ts           # Device permission helpers
│   ├── errorReporting.ts        # Error tracking
│   └── logger.ts                # Client-side logging
├── config/                      # Application configuration
│   ├── index.ts                 # Config aggregation
│   └── env.ts                   # Environment handling
├── themes/                      # UI theming
│   ├── ThemeProvider.tsx        # Theme context provider
│   ├── light.ts                 # Light theme definition
│   └── dark.ts                  # Dark theme definition
├── animations/                  # Animation utilities
│   ├── transitions.ts           # Screen transitions
│   └── animations.ts            # UI animations
└── device/                      # Native device features
    ├── voice.ts                 # Speech recognition
    ├── fileUpload.ts            # File picker and upload
    ├── haptics.ts               # Haptic feedback
    ├── notifications.ts         # Push notifications
    └── geolocation.ts           # Location services

```

## Backend Package (`/packages/backend/`)

```
backend/
├── package.json                 # Backend dependencies
├── tsconfig.json                # Backend TypeScript configuration
├── nodemon.json                 # Development server configuration
├── .env.example                 # Environment variables template
├── src/
│   ├── index.ts                 # Server entry point
│   ├── app.ts                   # Express application setup
│   ├── config/                  # Server configuration
│   │   ├── database.ts          # Database connection
│   │   ├── env.ts               # Environment configuration
│   │   ├── logger.ts            # Logging configuration
│   │   └── swagger.ts           # API documentation setup
│   ├── api/                     # API version organization
│   │   └── v1/                  # API version 1
│   │       ├── index.ts         # API router setup
│   │       ├── auth/            # Authentication endpoints
│   │       │   ├── auth.routes.ts # Auth routes
│   │       │   ├── auth.controller.ts # Auth handlers
│   │       │   ├── auth.service.ts # Auth business logic
│   │       │   └── auth.validation.ts # Request validation
│   │       ├── users/           # User endpoints
│   │       │   ├── user.routes.ts # User routes
│   │       │   ├── user.controller.ts # User handlers
│   │       │   ├── user.service.ts # User business logic
│   │       │   └── user.validation.ts # Request validation
│   │       ├── chat/            # Chat endpoints
│   │       │   ├── chat.routes.ts # Chat routes
│   │       │   ├── chat.controller.ts # Chat handlers
│   │       │   ├── chat.service.ts # Chat business logic
│   │       │   └── chat.validation.ts # Request validation
│   │       ├── ai/              # AI integration endpoints
│   │       │   ├── ai.routes.ts # AI routes
│   │       │   ├── ai.controller.ts # AI handlers
│   │       │   ├── ai.service.ts # AI integration logic
│   │       │   └── ai.validation.ts # Request validation
│   │       └── files/           # File handling endpoints
│   │           ├── file.routes.ts # File routes
│   │           ├── file.controller.ts # File handlers
│   │           ├── file.service.ts # File processing logic
│   │           └── file.validation.ts # Request validation
│   ├── models/                  # Database models
│   │   ├── user.model.ts        # User schema and methods
│   │   ├── chat.model.ts        # Chat conversation schema
│   │   ├── message.model.ts     # Chat message schema
│   │   ├── aiPrompt.model.ts    # Saved AI prompts
│   │   └── file.model.ts        # File metadata schema
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts   # JWT authentication
│   │   ├── error.middleware.ts  # Error handling
│   │   ├── validation.middleware.ts # Request validation
│   │   ├── logger.middleware.ts # Request logging
│   │   └── upload.middleware.ts # File upload handling
│   ├── services/                # Core business logic
│   │   ├── auth.service.ts      # Authentication logic
│   │   ├── user.service.ts      # User management
│   │   ├── chat.service.ts      # Chat functionality
│   │   ├── ai/                  # AI services
│   │   │   ├── openai.service.ts # OpenAI integration
│   │   │   ├── prompt.service.ts # Prompt management
│   │   │   └── context.service.ts # Context preparation
│   │   └── file.service.ts      # File storage and processing
│   ├── utils/                   # Utility functions
│   │   ├── ApiError.ts          # Custom error class
│   │   ├── ApiResponse.ts       # Response formatter
│   │   ├── encryption.ts        # Data encryption utilities
│   │   ├── validators.ts        # Input validation
│   │   ├── token.ts             # JWT token handling
│   │   └── logger.ts            # Logging utilities
│   ├── types/                   # TypeScript type definitions
│   │   ├── express.d.ts         # Express augmentations
│   │   ├── openai.d.ts          # OpenAI API typings
│   │   └── environment.d.ts     # Environment variables
│   ├── jobs/                    # Background processing
│   │   ├── scheduler.ts         # Job scheduler setup
│   │   └── cleanup.job.ts       # Data cleanup task
│   ├── events/                  # Event system
│   │   ├── eventEmitter.ts      # Event bus setup
│   │   └── handlers/            # Event handlers
│   │       ├── userEvents.ts    # User-related events
│   │       └── chatEvents.ts    # Chat-related events
│   └── websockets/              # Real-time communication
│       ├── socket.ts            # Socket.io setup
│       └── handlers/            # Socket event handlers
│           ├── chatHandler.ts   # Chat socket events
│           └── typingHandler.ts # Typing indicator events
└── __tests__/                   # Backend tests
    ├── integration/             # API integration tests
    ├── unit/                    # Unit tests
    └── fixtures/                # Test data

```

## File Descriptions and Purposes

### Root Configuration Files

- **README.md**: Project overview, setup instructions, architecture explanation
- **package.json**: Root package with workspace configuration and shared scripts
- **lerna.json**: Monorepo management for shared package publishing
- **tsconfig.json**: Base TypeScript configuration inherited by sub-packages
- **.eslintrc.js**: Code quality and style rules for consistent development
- **.prettierrc**: Code formatting rules for consistent code style
- **jest.config.js**: Test runner configuration for all packages
- **.env/.env.production**: Environment variables for development and production
- **docker-compose.yml**: Multi-container setup for local development with database, Redis, etc.
- **Dockerfile.backend/frontend**: Container build instructions for each package

### Common Package

- **types/**: Shared TypeScript interfaces ensuring consistent data structures across frontend and backend
- **constants/**: Shared values like API endpoints and error codes
- **utils/**: Helper functions used in both packages
- **schemas/**: Data validation schemas for consistent validation

### Frontend Package

### Core Files

- **App.tsx**: Application entry point that initializes providers and navigation
- **app.json**: Expo configuration including name, version, and permissions
- **metro.config.js**: React Native bundler configuration for module resolution

### Assets Directory

- **fonts/**: Custom typography resources
- **images/**: UI graphics, logos, and backgrounds
- **animations/**: Lottie animation files for enhanced UX

### Components Directory

- **common/**: Generic, reusable UI elements
- **layout/**: Structural components for consistent screen layouts
- **chat/**: Chat-specific UI components
- **auth/**: Authentication forms and UI elements
- **profile/**: User profile display and editing components
- **ai/**: AI-specific interface components

### Contexts Directory

- **AuthContext.tsx**: User authentication state management
- **ThemeContext.tsx**: Theme preference and switching
- **ChatContext.tsx**: Chat state and operations
- **AIContext.tsx**: AI settings and configuration

### Hooks Directory

- **useAuth.ts**: Authentication operations (login, register, logout)
- **useChat.ts**: Chat operations (send, receive, history)
- **useTheme.ts**: Theme selection and toggling
- **useVoiceInput.ts**: Speech recognition for voice messaging
- **useFileUpload.ts**: File selection and uploading
- **useAppState.ts**: Application lifecycle monitoring
- **useNotifications.ts**: Push notification handling
- **useAI.ts**: AI interaction and response handling

### Navigation Directory

- **AppNavigator.tsx**: Main navigation structure after authentication
- **AuthNavigator.tsx**: Authentication flow navigation
- **RootNavigator.tsx**: Root container that handles auth state changes
- **NavigationService.ts**: Navigation utilities for non-component navigation

### Screens Directory (UI Views)

- **Auth/**: User authentication screens
- **Onboarding/**: First-time user experience
- **Home/**: Main application screens
- **Chat/**: Messaging interface screens
- **Profile/**: User profile screens
- **AI/**: AI assistant interaction screens
- **Settings/**: Application configuration screens

### Services Directory

- **api/**: HTTP client for backend communication
- **openai/**: OpenAI API integration
- **storage/**: Local data persistence

### Store Directory

- **index.ts**: Zustand store configuration
- **slices/**: State management by feature

### Utils Directory

- **constants.ts**: Application-wide constants
- **validators.ts**: Input validation functions
- **analytics.ts**: Usage tracking
- **permissions.ts**: Device permission handling
- **errorReporting.ts**: Error tracking service integration
- **logger.ts**: Client-side logging

### Config Directory

- **env.ts**: Environment variable handling
- **index.ts**: Configuration aggregation

### Themes Directory

- **light.ts/dark.ts**: Theme color schemes
- **ThemeProvider.tsx**: Theme context implementation

### Animations Directory

- **transitions.ts**: Screen transition animations
- **animations.ts**: UI element animations

### Device Directory

- **voice.ts**: Speech recognition implementation
- **fileUpload.ts**: File picker and upload utilities
- **haptics.ts**: Haptic feedback implementation
- **notifications.ts**: Push notification handling
- **geolocation.ts**: Location services integration

### Backend Package

### Core Files

- **index.ts**: Server entry point that bootstraps the application
- **app.ts**: Express application configuration

### Config Directory

- **database.ts**: Database connection setup (MongoDB)
- **env.ts**: Environment variable validation
- **logger.ts**: Server logging configuration
- **swagger.ts**: API documentation setup

### API Directory

- **v1/**: API version 1 implementation
- Each feature has its own subdirectory with:
  - **routes.ts**: Endpoint definitions
  - **controller.ts**: Request handlers
  - **service.ts**: Business logic
  - **validation.ts**: Request validation

### Models Directory

- **user.model.ts**: User data schema and methods
- **chat.model.ts**: Chat conversation schema
- **message.model.ts**: Individual message schema
- **aiPrompt.model.ts**: Saved AI prompts schema
- **file.model.ts**: File metadata schema

### Middlewares Directory

- **auth.middleware.ts**: JWT authentication validation
- **error.middleware.ts**: Global error handling
- **validation.middleware.ts**: Request data validation
- **logger.middleware.ts**: Request logging
- **upload.middleware.ts**: File upload handling

### Services Directory

- **auth.service.ts**: Authentication business logic
- **user.service.ts**: User management operations
- **chat.service.ts**: Chat functionality
- **ai/**: AI integration services
- **file.service.ts**: File storage and processing

### Utils Directory

- **ApiError.ts**: Custom error class for consistent errors
- **ApiResponse.ts**: Response formatter for consistent API responses
- **encryption.ts**: Data encryption utilities
- **validators.ts**: Input validation functions
- **token.ts**: JWT generation and verification
- **logger.ts**: Logging utilities

### Types Directory

- **express.d.ts**: Express type augmentations
- **openai.d.ts**: OpenAI API type definitions
- **environment.d.ts**: Environment variable types

### Jobs Directory

- **scheduler.ts**: Background job scheduler
- **cleanup.job.ts**: Data cleanup task

### Events Directory

- **eventEmitter.ts**: Event bus implementation
- **handlers/**: Event handler implementations

### Websockets Directory

- **socket.ts**: Socket.io setup and configuration
- **handlers/**: Socket event handlers by feature

## Integration Points

1. **Common Package**: Shared types and utilities ensure consistency between frontend and backend
2. **API Communication**: Frontend services communicate with backend API controllers
3. **Authentication Flow**: JWT tokens handled by auth service and middleware
4. **Real-time Chat**: Websockets provide live messaging between users
5. **AI Integration**: OpenAI services process user input and generate responses
6. **File Handling**: File upload, processing, and storage flows
7. **Event System**: Backend events trigger push notifications to frontend

This comprehensive structure provides a solid foundation for a scalable AI-powered mobile application with clean separation of concerns, proper organization, and efficient data flow between components.
