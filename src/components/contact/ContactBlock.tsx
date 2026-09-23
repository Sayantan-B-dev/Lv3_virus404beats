import { getSocialLinks } from "@/data/content";

export default function ContactBlock() {
  const links = getSocialLinks();
  return (
    <section className="section" id="contact">
      <div className="contact">
        <div className="contact-main">
          <h4>
            LET&apos;S
            <br />
            WORK.
          </h4>
          <p>
            Got a record, project, visual, campaign or sound that needs a
            stronger identity?
          </p>
          <a href="mailto:hello@virus404beats.com">START A PROJECT &rarr;</a>
        </div>
        <div className="contact-side">
          {links.map((link) => (
            <div className="contact-row" key={link.id}>
              <span>{link.platform}</span>
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
