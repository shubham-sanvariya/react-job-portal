

import { MantineProvider} from '@mantine/core'
import './App.css'

import '@mantine/core/styles.css';
import HomePage from "@/pages/homePage.tsx";

function App() {

  return (
    <MantineProvider>
      <HomePage/>
    </MantineProvider >
  )
}

export default App
