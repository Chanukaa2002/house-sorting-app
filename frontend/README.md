# Hogwarts House Sorting Frontend

A magical React application that connects to the House Sorting Hat backend to determine which Hogwarts house you belong to!

## Features

- 🎭 **Immersive Wizarding Experience**: Magical animations, custom SVG graphics, and Harry Potter themed design
- ✨ **Beautiful Animations**: Smooth transitions powered by Framer Motion
- 🏰 **Interactive Questionnaire**: 24 carefully crafted questions that analyze your personality
- 🎨 **Custom SVG Graphics**: Hand-crafted Sorting Hat and House Crests
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🌟 **Real-time Results**: Live probability calculations and trait analysis
- 🎯 **Modern UI/UX**: Clean, elegant interface with magical particle effects

## Technology Stack

- **React 18** - Modern React with hooks
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations and transitions
- **Custom SVG Graphics** - Hand-crafted magical elements
- **Modern CSS** - Gradients, animations, and responsive design

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.js      # Landing page with Sorting Hat
│   ├── QuestionnaireScreen.js # Interactive questionnaire
│   ├── LoadingScreen.js      # Magical loading animation
│   ├── ResultScreen.js       # House reveal and results
│   ├── SortingHatSVG.js     # Animated Sorting Hat
│   └── HouseCrestSVG.js     # House crest graphics
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── index.css                 # Global styles
```

## Features Overview

### Welcome Screen

- Animated Sorting Hat with magical particles
- Elegant typography with Harry Potter fonts
- Smooth entrance animations

### Questionnaire

- 24 thoughtfully designed questions
- Visual progress tracking
- Smooth slider controls with magical styling
- Question validation and navigation

### Loading Screen

- Animated crystal ball with swirling magic
- Dynamic loading messages
- Particle effects and progress indication

### Results Screen

- Dramatic house reveal with custom animations
- Detailed probability breakdown for all houses
- Personal trait analysis
- Celebratory particle effects

## API Integration

The frontend connects to the Flask backend at `http://localhost:5000` with the following endpoints:

- `GET /questions` - Fetch questionnaire questions
- `POST /predict` - Submit answers and get house prediction
- `GET /houses` - Get house information

## Styling

- **Color Scheme**: Dark magical theme with gold accents
- **Typography**: Cinzel for headings, Crimson Text for body
- **Animations**: Smooth transitions, floating elements, particle effects
- **Responsive**: Mobile-first design with fluid layouts

## House Themes

Each house has unique styling:

- **Gryffindor**: Red and gold with lion imagery
- **Hufflepuff**: Yellow and black with badger elements
- **Ravenclaw**: Blue and bronze with eagle motifs
- **Slytherin**: Green and silver with serpent designs

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

To run in development mode:

```bash
npm start
```

To build for production:

```bash
npm run build
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes and is inspired by the Harry Potter universe created by J.K. Rowling.
