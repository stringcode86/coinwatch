import { useColorScheme } from 'react-native'
import {
  CustomToast,
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  config,
  isWeb,
} from '@my/ui'
import { ToastViewport } from './ToastViewport'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();
console.log('[CREATING NEW QUERY CLIENT] !!!!!')

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={isWeb ? [] : ['mobile']}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <CustomToast />
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  )
}
