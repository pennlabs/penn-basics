import { useRouter } from 'next/router'

const Dining = () => {
  const router = useRouter()
  const { id } = router.query

  return <p> Post: {id} </p>
}

export default Dining
