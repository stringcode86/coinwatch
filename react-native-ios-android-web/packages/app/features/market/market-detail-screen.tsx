import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { useQuery} from "@tanstack/react-query";
import { get as cgGet } from "app/data/coinGeckoClient/client";
import { Market } from "app/data/coinGeckoClient/types";
import { defaultGetMarketsParams } from "app/data/coinGeckoClient/utils";

export function MarketDetailScreen({ id }: { id: string }) {
  const router = useRouter()
  const markets = useQuery({
    queryKey: ['/coins/markets', id],
    queryFn: ({queryKey}) => cgGet<Market[]>(
      queryKey[0] as string, {...defaultGetMarketsParams, ids: id}
    ),
  })

  const market = markets.data?.[0]
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
