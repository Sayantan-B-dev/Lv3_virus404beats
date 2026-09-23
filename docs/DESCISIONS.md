# DESCISIONS

NOTE
Filename intentionally preserved as requested.

## D001
DECISION = Next.js full-stack app.
WHY = public pages + server data + auth callbacks + admin + SEO + Vercel.

## D002
DECISION = Turso/libSQL.
WHY = relational persistent portfolio data.
NOT FOR = binary media.

## D003
DECISION = Cloudinary media.
WHY = audio/covers independent from DB.
DB stores refs + metadata.

## D004
DECISION = Google OAuth + ADMIN_EMAILS.
WHY = identity != authorization.

## D005
DECISION = Resend OTP.
WHY = extra admin verification layer.
RULES = short TTL + one-time + attempt limit + throttling.

## D006
DECISION = DB-backed content.
WHY = future admin must add work without source edits.

## D007
DECISION = draft/published/archived.
WHY = safe content lifecycle.

## D008
DECISION = public/admin separation.
WHY = public route must never rely on client-side permission behavior.

## D009
DECISION = RSC default.
WHY = mostly content presentation; lower client JS.

## D010
DECISION = maximalism + grid brutalism.
WHY = strong music/editorial identity.
DETAIL = DESIGN.md.

## D011
DECISION = conservative factual claims.
WHY = 900+ = self-reported; public catalog incomplete.

## D012
DECISION = archive preferred over destructive delete.
WHY = protect historical content/media/relations.

## D013
DECISION = content model before UI hardcoding.
WHY = future CMS requirement.

## D014
DECISION = external music/social links initially manual.
WHY = avoid API sync complexity until needed.