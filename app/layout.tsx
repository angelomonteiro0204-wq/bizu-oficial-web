export const metadata = {
  title: 'Bizu do Cadete - Preparação Militar',
  description: 'Estude com questões inteligentes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
