# Car Catalog Mobile App

![React Native](https://img.shields.io/badge/React%20Native-0.79.3-blue)
![Expo](https://img.shields.io/badge/Expo-53.0.11-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)

A mobile application built with React Native and Expo that allows users to browse car brands and models using the FIPE API (Brazilian Vehicle Price Index).

## Features

- User authentication (login/logout)
- Browse car brands with search functionality
- View car models for each brand
- Responsive and user-friendly interface
- Efficient search with debounce implementation

## Screenshots

*(Screenshots to be added)*
![image](https://github.com/user-attachments/assets/a8a63515-6cb8-46e5-b5b7-7f77fd719230)
![image](https://github.com/user-attachments/assets/f8a55fda-1a08-498b-ab27-3b90b94f840f)
![image](https://github.com/user-attachments/assets/e47a17c0-4606-4cda-aa29-8ef8cc960ef5)
![image](https://github.com/user-attachments/assets/ebd7a869-6e7e-45eb-b3f3-46651bfee9b2)
![image](https://github.com/user-attachments/assets/e573c40f-a3c3-4cc5-bb83-a43452159966)
![image](https://github.com/user-attachments/assets/be9ff0d9-7b35-4d84-8491-1eb5c21213f6)
![image](https://github.com/user-attachments/assets/13081bd4-4c6a-45f8-b295-5277fe2aa000)


## Project Structure

```
src/
├── components/        # UI components organized by atomic design
│   ├── atoms/         # Basic UI elements (buttons, inputs, text)
│   ├── molecules/     # Combinations of atoms (headers, search bars)
│   └── organisms/     # Complex UI components (forms, lists)
├── contexts/          # React Context providers
├── screens/           # App screens/pages
├── services/          # API service integration
└── utils/             # Utility functions and helpers
```

## Tech Stack

- **React Native**: Framework for building native apps
- **Expo**: Development platform for React Native
- **TypeScript**: For type safety and better developer experience
- **React Navigation**: Navigation and routing
- **Axios**: HTTP client for API requests
- **React Hook Form**: Form handling
- **Styled Components**: Component styling
- **Expo Vector Icons**: Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (for running on emulators)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mobileapp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on a device or emulator:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan the QR code with the Expo Go app on your phone

## API Integration

The app uses two APIs:
1. **Authentication API**: Custom auth service for user login
2. **FIPE API**: Public API for car brands and models data in Brazil

## Development Notes

### Code Organization

- **Atomic Design**: Components are organized following the atomic design methodology
- **TypeScript**: Strong typing is used throughout the project
- **Context API**: Used for state management (authentication)

### Performance Optimizations

- **Debounce**: Implemented on search inputs to prevent excessive API calls
- **Virtualized Lists**: Used for efficient rendering of long lists
- **Memoization**: Used to prevent unnecessary re-renders

## Testing

```bash
# Run TypeScript type checking
npx tsc --noEmit

# Run tests (to be implemented)
# npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [FIPE API](https://deividfortuna.github.io/fipe/) for car data
- [Expo](https://expo.dev/) for the development tools
- [React Native](https://reactnative.dev/) community 
