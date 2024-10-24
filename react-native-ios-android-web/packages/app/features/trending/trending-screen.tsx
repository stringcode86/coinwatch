import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack, Container,
} from '@my/ui'
import { useTrending } from 'app/features/trending/hooks'


export function TrendingScreen() {
  const { coins } = useTrending()

  console.log('[TRENDING COIN RESULT]', coins.length)

  return (
    <Container maxHeight='100vh'>
      <Paragraph>Trending screen {coins.length}</Paragraph>
    </Container>
  )
}

