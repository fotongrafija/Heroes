import '../styles/characterCards.scss'

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface CharacterCardProps {
  data: Character[];
}

export const CharacterCard = ({ data, onSave, onRemove }: CharacterCardProps): JSX.Element => {
  return (
    <div className="characters">
      {data.map(character =>
        <div key={character.id} className="characterCard" style={{
          background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center`,
          backgroundSize: 'cover'
        }}>
          <div className="caption">
            {character.name}
          </div>
          <div className="bookmark">
            <input className='check-box'
              type="checkbox"
              checked={JSON.parse(localStorage.getItem('savedCharacters') || '[]').some((c: Character) => c.id === character.id)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  onSave(character)
                } else {
                  onRemove(character.id)
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
