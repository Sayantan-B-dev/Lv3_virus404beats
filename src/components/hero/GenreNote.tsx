import { GENRES } from "@/data/content";

export default function GenreNote() {
  return (
    <div className="note genres" data-drag="genres" data-depth="14">
      <h3>GENRES</h3>
      <ul>
        {GENRES.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
