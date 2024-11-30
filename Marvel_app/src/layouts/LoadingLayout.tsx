
import { createPortal } from "react-dom"
import '../styles/loadingLayout.scss'
import LoadingSpinner from "../components/LoadingSpinner"

export const LoadingLayout = () => {
  return (
    createPortal(<div className="loading-layout">
      <LoadingSpinner />
    </div>, document.getElementById('root')!)

  )
}
