

import { MantineProvider, Slider, Text } from '@mantine/core'
import './App.css'

import '@mantine/core/styles.css';

function App() {

  return (
    <MantineProvider>
      <Text>Welcome to Mantine!</Text>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Slider
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </MantineProvider >
  )
}

export default App
