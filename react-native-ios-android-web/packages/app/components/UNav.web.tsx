import { Nav, H2, View, XStack, Button } from '@my/ui'
import { Home, TrendingUp, Star } from '@tamagui/lucide-icons'
import { useLink } from "solito/navigation";

export default function UNav({ title = 'Coin Watch', pagesMode = false }: {
  title: string,
  pagesMode: boolean,
}) {
  const linkPrefix = pagesMode ? '/pages-' : '/'
  const linkProps = useLink({href: `${linkPrefix}`})
  const linkFavoriteProps = useLink({href: `${linkPrefix}favorite`})
  const linkTrendingProps = useLink({href: `${linkPrefix}trending`})

  return (
    <Nav p="$4" pb="$0">
      <XStack>
        <H2>{title}</H2>
        <View f={1}></View>
        <XStack gap="$2">
          <Button {...linkProps} icon={Home}>Coins</Button>
          <Button {...linkFavoriteProps} icon={Star}>Favorites</Button>
          <Button {...linkTrendingProps} icon={TrendingUp}>Trending</Button>
        </XStack>
      </XStack>
    </Nav>
  )
}