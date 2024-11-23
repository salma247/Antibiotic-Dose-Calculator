# Creatinine Clearance Dose Calculator

A professional web application designed to help healthcare professionals calculate medication doses based on Creatinine Clearance (CrCl) values. This tool provides evidence-based dosing recommendations for various medications while considering renal function.

## Features

- 🧮 Real-time dose calculations based on CrCl values
- 💊 Support for multiple medications
- 📱 Responsive design for desktop and mobile devices
- ⚡ Fast, client-side calculations
- 🔒 No data storage - all calculations performed locally

## live demo

[Live Demo](https://salma247.github.io/Antibiotic-Dose-Calculator/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/salma247/Antibiotic-Dose-Calculator.git
```

2. Install dependencies:
```bash
cd crcl-dose-calculator
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Navigate to the "Adult Dosing" tab
2. Enter the patient's Creatinine Clearance (CrCl) in mL/min
3. Select the desired medication from the dropdown
4. Click "Calculate Dose" to view the recommended dosing

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Development

### Project Structure

```
src/
├── components/     # Reusable UI components
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Important Notes

This calculator is intended to be used as a reference tool only. Healthcare professionals should:

- Always verify calculations independently
- Use clinical judgment when interpreting results
- Consider patient-specific factors
- Consult current drug information resources

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Disclaimer

This software is provided for educational and reference purposes only. It should not be used as the sole basis for medical decisions. Always consult appropriate medical references and use professional judgment in clinical decision-making.