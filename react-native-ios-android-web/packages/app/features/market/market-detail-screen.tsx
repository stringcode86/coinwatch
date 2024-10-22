import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { useMarket } from "app/features/market/hooks"

export function MarketDetailScreen({ id }: { id: string }) {
  const router = useRouter()
  const { market } = useMarket(id)
  console.log('[ID]', id, market)

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      gap="$4"
      bg="$background"
    >
      <Paragraph
        ta="center"
        fow="700"
        col="$blue10"
      >{`User ID: ${id} ${market?.name} ${market?.symbol}`}</Paragraph>
      <Button
        icon={ChevronLeft}
        onPress={() => router.back()}
      >
        Go Home
      </Button>
    </YStack>
  )
}
