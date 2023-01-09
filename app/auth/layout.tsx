export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  
    return (

        <>
  
              {children}
              <p className="text-center text-gray-600 mt-3">Copryight © 2022 Hye Hosting LLC.</p>
          </>
    )
  }