export default function Scribble() {
  return (
    <>
      <div className="scribble one" data-drag="scribble1" data-depth="20" aria-hidden="true">
        REAL
        <br />
        RECOGNIZE
        <br />
        REAL
      </div>
      <div className="scribble two" data-drag="scribble2" data-depth="20" aria-hidden="true">
        KEEP
        <br />
        IT RAW
      </div>
      <div className="scribble three" data-drag="scribble3" data-depth="20" aria-hidden="true">
        VIRUS VIRUS VIRUS
      </div>
      <div className="scribble four" data-drag="scribble4" data-depth="20" aria-hidden="true">
        NO SIGNAL
      </div>

      <div className="marker m1" data-drag="marker1" data-depth="20" aria-hidden="true">
        MAKE NOISE
      </div>
      <div className="marker m2" data-drag="marker2" data-depth="20" aria-hidden="true">
        CUT / CHOP / MIX
      </div>
      <div className="marker m3" data-drag="marker3" data-depth="20" aria-hidden="true">
        LOUDER
      </div>
    </>
  );
}
