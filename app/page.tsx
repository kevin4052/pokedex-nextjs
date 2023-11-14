import PokeCard from '../components/PokeCard'

export default async function Home() {
  return (
    <div className="container p-4">
      <PokeCard pokemonId={1}></PokeCard>
    </div>
  )
}
