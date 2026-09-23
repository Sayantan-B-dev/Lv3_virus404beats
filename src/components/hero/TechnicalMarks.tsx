export default function TechnicalMarks() {
  return (
    <>
      <div className="cross a" data-drag="crossa" data-depth="10" aria-hidden="true">
        &#10005;
      </div>
      <div className="cross b" data-drag="crossb" data-depth="10" aria-hidden="true">
        &#10033;
      </div>
      <div className="cross c" data-drag="crossc" data-depth="10" aria-hidden="true">
        &#10005;
      </div>

      <div className="crosshair ch1" data-drag="ch1" data-depth="10" aria-hidden="true" />
      <div className="crosshair ch2" data-drag="ch2" data-depth="10" aria-hidden="true" />
      <div className="crosshair ch3" data-drag="ch3" data-depth="10" aria-hidden="true" />

      <div className="barcode" data-drag="barcode" data-depth="10" aria-hidden="true" />
    </>
  );
}
