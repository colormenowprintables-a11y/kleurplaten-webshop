import { notFound } from'next/navigation';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Maandelijkse Kleurwedstrijd & Prijzen | ColorMeNow',
      description: 'Doe mee aan de maandelijkse ColorMeNow kleurwedstrijd! Win 100-Mega Pack PDF bundels, digitale certificaten en eereplaatsen op de site.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Monatlicher Ausmalwettbewerb & Preise | ColorMeNow',
      description: 'Nehmen Sie am monatlichen ColorMeNow Ausmalwettbewerb teil und gewinnen Sie tolle digitale Malbuch-Bundles!',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Concours de Coloriage Mensuel & Prix | ColorMeNow',
      description: 'Participez au concours de coloriage mensuel ColorMeNow et gagnez de magnifiques bundles de livres PDF!',
    };
  }
  return {
    title: 'Monthly Coloring Contest & Prizes | ColorMeNow',
    description: 'Join the monthly ColorMeNow coloring contest! Win 100-Page Mega Pack PDF Bundles, digital certificates, and featured showcase spots.',
  };
}

export default async function ContestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const prizes = [
    {
      place: '1st',
      medal: '🥇',
      badge: isNl ? '1e Prijs — Goud' : isDe ? '1. Preis — Gold' : isFr ? '1er Prix — Or' : '1st Place — Gold Winner',
      title: isNl ? '100-Mega Pack Bundel + Certificaat' : isDe ? '100-Mega Pack Bundle + Zertifikat' : isFr ? 'Pack 100 Coloriages + Certificat' : '100-Page Mega Pack Bundle + Artist Certificate',
      desc: isNl
        ? 'Ontvang het complete 100-pagina PDF Kleurboek Mega Pack, een officieel digitaal winnaars-certificaat en een ereplaats op onze Hall of Fame!'
        : isDe
        ? 'Erhalten Sie das komplette 100-Seiten PDF Malbuch Mega Pack, ein offizielles Gewinner-Zertifikat und einen Platz in unserer Hall of Fame!'
        : isFr
        ? 'Recevez le pack complet de 100 pages PDF, un certificat officiel de gagnant et une place d’honneur!'
        : 'Get the complete 100-page PDF Mega Pack bundle, an official digital winner certificate, and a featured showcase spot on our website!',
      color: '#FEF3C7',
      border: '#F59E0B',
      textColor: '#92400E'
    },
    {
      place: '2nd',
      medal: '🥈',
      badge: isNl ? '2e Prijs — Zilver' : isDe ? '2. Preis — Silber' : isFr ? '2ème Prix — Agent' : '2nd Place — Silver Winner',
      title: isNl ? '3-Boeken Thema Bundel naar Keuze' : isDe ? '3-Bücher Themen-Bundle nach Wahl' : isFr ? 'Bundle de 3 Livres au Choix' : '3-Book Theme Choice Bundle PDF',
      desc: isNl
        ? 'Kies 3 complete digitale kleurboeken uit ons assortiment + Zilveren ColorMeNow Artist Badge.'
        : isDe
        ? 'Wählen Sie 3 digitale Malbücher aus unserem Sortiment + Silbernes Künstler-Badge.'
        : isFr
        ? 'Choisissez 3 livres de coloriage numériques complets + Badge Artiste d’Argent.'
        : 'Choose any 3 complete digital coloring books from our catalog + Silver ColorMeNow Artist Badge.',
      color: '#F1F5F9',
      border: '#94A3B8',
      textColor: '#334155'
    },
    {
      place: '3rd',
      medal: '🥉',
      badge: isNl ? '3e Prijs — Brons' : isDe ? '3. Preis — Bronze' : isFr ? '3ème Prix — Bronze' : '3rd Place — Bronze Winner',
      title: isNl ? '1-Kleurboek naar Keuze' : isDe ? '1-Malbuch nach Wahl' : isFr ? '1 Livre de Coloriage au Choix' : '1-Book Theme Choice PDF',
      desc: isNl
        ? 'Kies 1 compleet digitaal kleurboek naar keuze + Bronzen ColorMeNow Artist Badge.'
        : isDe
        ? 'Wählen Sie 1 digitales Malbuch nach Wahl + Bronzenes Künstler-Badge.'
        : isFr
        ? 'Choisissez 1 livre de coloriage numérique au choix + Badge Artiste de Bronze.'
        : 'Choose 1 complete digital coloring book of your choice + Bronze ColorMeNow Artist Badge.',
      color: '#FFEDD5',
      border: '#F97316',
      textColor: '#9A3412'
    },
    {
      place: 'All',
      medal: '🎁',
      badge: isNl ? 'Iedereen Wint!' : isDe ? 'Alle Gewinnen!' : isFr ? 'Tout le monde gagne!' : 'All Participants',
      title: isNl ? 'Bonus Kleurplaat & Certificaat' : isDe ? 'Bonus-Ausmalbild & Zertifikat' : isFr ? 'Coloriage Bonus & Certificat' : 'Bonus Coloring Sheet & Certificate',
      desc: isNl
        ? 'Elke deelnemer ontvangt een exclusieve geheime bonus kleurplaat & printbaar Deelname-Certificaat!'
        : isDe
        ? 'Jeder Teilnehmer erhält ein exklusives Bonus-Ausmalbild & Teilnehmer-Zertifikat zum Ausdrucken!'
        : isFr
        ? 'Chaque participant reçoit un coloriage secret bonus et un certificat de participation!'
        : 'Every participant receives an exclusive secret bonus coloring page & printable Certificate of Participation!',
      color: '#F0FDF4',
      border: '#22C55E',
      textColor: '#166534'
    }
  ];

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #F3E8FF 0%, var(--background) 100%)', borderBottomColor: '#E9D5FF' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(147, 51, 234, 0.15)',
            color: '#9333EA',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            🏆 {isNl ? 'Maandelijkse Creatieve Kleurwedstrijd' : isDe ? 'Monatlicher Ausmalwettbewerb' : isFr ? 'Concours Mensuel de Coloriage' : 'Monthly Creative Coloring Contest'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl ? 'Kleurwedstrijd & Maandelijkse Prijzen' : isDe ? 'Ausmalwettbewerb & Monatliche Preise' : isFr ? 'Concours de Coloriage & Prix' : 'Coloring Contest & Monthly Prizes'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Laat ons je mooiste kleurwerk zien en maak elke maand kans op prachtige kleurboeken, certificaten en ereplaatsen op onze website!'
              : isDe
              ? 'Zeigen Sie uns Ihre schönsten Ausmalwerke und gewinnen Sie jeden Monat tolle Preise!'
              : isFr
              ? 'Montrez-nous vos plus beaux coloriages et gagnez de magnifiques prix chaque mois!'
              : 'Show us your best coloring work and win amazing monthly coloring book bundles, certificates, and showcase spots!'}
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Prizes Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="title-h2" style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0F172A' }}>
              🎁 {isNl ? 'Wat Zijn De Prijzen Van Deze Maand?' : isDe ? 'Was Sind Die Monatlichen Preise?' : isFr ? 'Quels Sont Les Prix Mensuels?' : 'What Are This Month’s Prizes?'}
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.4rem' }}>
              {isNl ? 'Elke maand worden er 3 hoofdprijswinnaars én bonusprijzen voor alle deelnemers uitgereikt!' : isDe ? 'Jeden Monat werden 3 Hauptgewinner und Bonuspunkte vergeben!' : isFr ? 'Chaque mois, 3 gagnants et des bonus pour tous sont attribués!' : 'Every month we award 3 top prizes plus bonus rewards for all entries!'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {prizes.map((p) => (
              <div
                key={p.place}
                style={{
                  background: p.color,
                  borderRadius: '20px',
                  border: `2px solid ${p.border}`,
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2.75rem' }}>{p.medal}</span>
                    <span style={{
                      background: '#FFFFFF',
                      color: p.textColor,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      border: `1px solid ${p.border}`,
                    }}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {p.title}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="title-h2" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>
              🛠️ {isNl ? 'Hoe Werkt Het?' : isDe ? 'Wie Funktioniert Es?' : isFr ? 'Comment Ça Marche?' : 'How It Works'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '1', icon: '📥', title: isNl ? '1. Kies een Kleurplaat' : isDe ? '1. Wählen Sie ein Bild' : isFr ? '1. Choisissez un Coloriage' : '1. Pick any Coloring Page', desc: isNl ? 'Kies een willekeurige kleurplaat of kleurboek uit onze collectie.' : isDe ? 'Wählen Sie ein beliebiges Ausmalbild aus unserer Sammlung.' : isFr ? 'Choisissez n’importe quel coloriage dans notre collection.' : 'Choose any coloring page from our extensive collection.' },
              { step: '2', icon: '🎨', title: isNl ? '2. Kleur Het In' : isDe ? '2. Malen Sie Es Aus' : isFr ? '2. Coloriez-le' : '2. Color It In', desc: isNl ? 'Gebruik potloden, stiften, verf of onze online kleurtool!' : isDe ? 'Nutzen Sie Buntstifte, Marker oder unser Online-Tool!' : isFr ? 'Utilisez des crayons, feutres ou notre outil en ligne!' : 'Use pencils, markers, paint, or color online digitally!' },
              { step: '3', icon: '📸', title: isNl ? '3. Stuur Je Foto In' : isDe ? '3. Foto Einreichen' : isFr ? '3. Envoyez Votre Photo' : '3. Submit Your Entry', desc: isNl ? 'Stuur een scherpe foto via de contactpagina met onderwerp "Wedstrijd".' : isDe ? 'Senden Sie ein Foto über unsere Kontaktseite mit Betreff "Wettbewerb".' : isFr ? 'Envoyez une photo via notre page contact avec l’objet "Concours".' : 'Send us a photo via our contact page with "Contest" in the subject.' },
              { step: '4', icon: '🏆', title: isNl ? '4. Win & Ontvang Prijzen' : isDe ? '4. Gewinnen & Empfangen' : isFr ? '4. Gagnez Vos Prix' : '4. Win & Receive Prizes', desc: isNl ? 'Aan het einde van de maand worden alle winnaars per e-mail bekendgemaakt.' : isDe ? 'Am Monatsende werden die Gewinner per E-Mail benachrichtigt.' : isFr ? 'À la fin du mois, les gagnants sont annoncés par e-mail.' : 'At the end of the month, winners are selected and prizes sent via email.' },
            ].map(item => (
              <div key={item.step} style={{ background: '#FFFFFF', borderRadius: '18px', border: '1.5px solid var(--gray-200)', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem', color: '#0F172A' }}>{item.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#FFFFFF',
          boxShadow: '0 15px 35px rgba(124, 58, 237, 0.25)',
        }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>
            {isNl ? 'Klaar om Mee te Doen?' : isDe ? 'Bereit zum Mitmachen?' : isFr ? 'Prêt à Participer?' : 'Ready to Join the Contest?'}
          </h2>
          <p style={{ color: '#F3E8FF', fontSize: '1.1rem', marginBottom: '1.75rem', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
            {isNl ? 'De kleurwedstrijd staat open voor iedereen — jong en oud zijn van harte welkom!' : isDe ? 'Der Wettbewerb steht jedem offen — alle Altersgruppen sind willkommen!' : isFr ? 'Le concours est ouvert à tous — tous les âges sont les bienvenus!' : 'The contest is open to everyone — toddlers, kids, teens, and adults are all welcome!'}
          </p>
          <a
            href={`/${lang}/contact`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.9rem 2.25rem',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: '#7C3AED',
              fontWeight: 900,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <span>🖼️</span>
            <span>{isNl ? 'Stuur Je Inzending In' : isDe ? 'Foto Einreichen' : isFr ? 'Envoyez Votre Photo' : 'Submit Your Entry'}</span>
          </a>
        </div>
      </div>
    </>
  );
}
