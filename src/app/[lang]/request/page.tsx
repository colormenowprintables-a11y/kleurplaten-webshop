import RequestForm from"@/components/RequestForm";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Kleurboek Aanvragen | ColorMeNow',
      description: 'Kun je het kleurboek dat je zoekt niet vinden? Vraag een nieuw digitaal kleurboek-thema aan!',
    };
  } else if (lang === 'de') {
    return {
      title: 'Malbuch Anfragen | ColorMeNow',
      description: 'Können Sie Ihr Wunsch-Malbuch nicht finden? Wünschen Sie sich ein neues Malbuch-Thema!',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Demander un Livre de Coloriage | ColorMeNow',
      description: 'Vous ne trouvez pas votre livre de coloriage? Demandez un nouveau thème de livre!',
    };
  }
  return {
    title: 'Request a Coloring Book | ColorMeNow',
    description: 'Can’t find the coloring book theme you’re looking for? Request a custom digital 35-page PDF coloring book!',
  };
}

export default async function RequestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const title = isNl ? 'Kleurboek Aanvragen' : isDe ? 'Malbuch Anfragen' : isFr ? 'Demander un Livre de Coloriage' : 'Request a Coloring Book';
  const subtitle = isNl
    ? 'Kun je het kleurboek-thema dat je zoekt niet vinden? Laat het ons weten en we ontwerpen een nieuw 35-pagina PDF kleurboek!'
    : isDe
    ? 'Können Sie Ihr Wunsch-Malbuchthema nicht finden? Teilen Sie es uns mit und wir erstellen ein neues 35-Seiten PDF Malbuch!'
    : isFr
    ? 'Vous ne trouvez pas le thème de coloriage que vous cherchez? Dites-le nous et nous créerons un livre PDF de 35 pages!'
    : 'Can’t find the coloring book theme you’re looking for? Let us know and we’ll design a new 35-page PDF book for you!';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">{title}</h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '650px', lineHeight: 1.7 }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div className="seo-block">
              <h2>{isNl ? 'Hoe Aanvragen Werken' : isDe ? 'Wie Anfragen Funktionieren' : isFr ? 'Comment Ça Marche' : 'How Book Requests Work'}</h2>
              <p>
                {isNl
                  ? 'We horen graag van onze community! Als er een specifiek thema, dierenras of fantasiewereld is die je als kleurboek wilt zien op ColorMeNow, stuur ons een bericht.'
                  : isDe
                  ? 'Wir freuen uns auf Ihre Ideen! Wenn Sie ein bestimmtes Malbuchthema wünschen, senden Sie uns eine Nachricht.'
                  : isFr
                  ? 'Nous adorons recevoir vos idées! Si vous souhaitez un thème de livre de coloriage spécifique, envoyez-nous un message.'
                  : 'We love hearing from our community! If there is a character theme, fantasy realm, or animal series you want to see as a full coloring book, send us a message.'}
              </p>
              <p style={{ marginTop: '1rem' }}>
                {isNl
                  ? 'Populaire aanvragen worden wekelijks uitgewerkt en toegevoegd aan onze winkel. Je ontvangt direct bericht zodra jouw kleurboek klaar staat!'
                  : isDe
                  ? 'Beliebte Anfragen werden wöchentlich erstellt. Sie werden direkt benachrichtigt, sobald Ihr Malbuch fertig ist!'
                  : isFr
                  ? 'Les demandes populaires sont créées chaque semaine. Vous recevrez une notification dès que votre livre sera prêt!'
                  : 'Popular requests are prioritized and added to our upcoming releases. You will receive an email notification as soon as your requested book goes live!'}
              </p>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '⏱️', text: isNl ? 'De meeste boekaanvragen worden binnen 1-2 weken verwerkt' : 'Most book requests are fulfilled within 1-2 weeks' },
                { icon: '📚', text: isNl ? 'Boeken worden uitgebracht als 35+ pagina A4 PDF bundels' : 'Books are released as full 35+ page A4 PDF bundles' },
                { icon: '⭐', text: isNl ? 'Je ontvangt bericht bij lancering van jouw thema' : 'You will be notified as soon as your theme goes live' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius)', border: '1px solid rgba(124,58,237,0.15)' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <RequestForm lang={lang} isEn={isEn} />
        </div>
      </div>
    </>
  );
}
