import BlogHero from '@/components/insights/blogs/BlogHero'
import Blogs from '@/components/insights/blogs/Blogs'
import ResouceHero from '@/components/insights/resources/ResourceHero'
import Resources from '@/components/insights/resources/Resources'
import Engagement from '@/components/landingPage/Engagement'

export default function page() {
  return (
    <>
      <ResouceHero />
      <Resources />
      <Engagement />
    </>
  )
}
