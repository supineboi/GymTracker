import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
    const [portalRoot, setPortalRoot] = useState(null)

    useEffect(() => {
        let root = document.getElementById('portal-root')
        
        if (!root) {
            root = document.createElement('div')
            root.id = 'portal-root'
            document.body.appendChild(root)
        }

        setPortalRoot(root)

        return () => {
            const existingRoot = document.getElementById('portal-root')
            if (existingRoot && existingRoot === root) {
                document.body.removeChild(root)
            }
        }
    }, [])

    return portalRoot ? createPortal(children, portalRoot) : null
}

export default Portal

