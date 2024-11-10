import '../styles/characterCards.scss'
import { Character } from '../hooks/useCharacterData';


interface CharacterCardProps {
  data: Character[];
  onAction: (character: Character) => void;

}

export const CharacterCard = ({ data, onAction }: CharacterCardProps): JSX.Element => {
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
          <div className="bookmark-wrapper">
            <label className="bookmark-control">
              <input
                className='bookmark-input'
                name="checkbox"
                type="checkbox"
                checked={JSON.parse(localStorage.getItem('savedCharacters') || '[]').some((c: Character) => c.id === character.id)}
                onChange={() => { onAction(character) }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
