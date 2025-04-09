# Arcade Facilitator

A React-based application for managing and displaying arcade game leaderboards and user statistics.

## Features

- User authentication and authorization
- Admin dashboard for data management
- Real-time leaderboard updates
- User profile management
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Papa Parse (for CSV handling)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arcade-facilitator.git
cd arcade-facilitator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
REACT_APP_API_URL=your_api_url
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  ├── context/       # React context providers
  ├── utils/         # Utility functions
  └── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Create React App
- Tailwind CSS
- Framer Motion
- React Router 