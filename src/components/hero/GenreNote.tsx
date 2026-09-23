import { GENRES } from "@/data/content";

export default function GenreNote() {
  return (
    <div className="note genres">
      <h3>GENRES</h3>
      <ul>
        {GENRES.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
