import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useInViewport } from '../hooks/useExperience'

const Lanyard = lazy(() => import('./Lanyard'))
const badgeImage = '/illustrative-profile-badge.svg'

export function ProfileBadge() {
  const { ref, visible } = useInViewport<HTMLDivElement>('450px')
  const sceneRef = useRef<HTMLDivElement>(null)
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const update = () => setWebglReady(Boolean(scene.querySelector('.lanyard-canvas')))
    const observer = new MutationObserver(update)
    observer.observe(scene, { childList: true, subtree: true })
    update()
    return () => observer.disconnect()
  }, [visible])

  return <div ref={ref} className="profile-badge" role="img" aria-label="Crachá ilustrativo temporário de Júnior Maia Müller. É possível arrastar e virar o crachá.">
    <div className={`profile-badge-fallback${webglReady ? ' is-hidden' : ''}`} aria-hidden="true">
      <span className="profile-badge-fallback-strap" />
      <span className="profile-badge-fallback-ring" />
      <img src={badgeImage} alt="" draggable={false} />
    </div>
    <div className="profile-badge-scene" ref={sceneRef} aria-hidden="true">
      {visible && <Suspense fallback={null}><Lanyard
        frontImage={badgeImage}
        backImage={badgeImage}
        imageFit="cover"
        orientation="portrait"
        finish="glossy"
        cornerRadius={0.28}
        size={0.56}
        anchor="right"
        strapLength={0.48}
        strapColor="#201a33"
        strapWidth={0.68}
        metal="silver"
        gravity={0.9}
        damping={0.62}
        elasticity={0.38}
        breeze={0.12}
        interactive
        intro
        className="profile-badge-lanyard"
      /></Suspense>}
    </div>
    <span className="sr-only">Imagem vetorial ilustrativa usada como espaço reservado para uma foto pessoal.</span>
  </div>
}
