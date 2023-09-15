import { pathToRoot } from "../util/path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTitle({ fileData, cfg }: QuartzComponentProps) {
  const title = cfg?.pageTitle ?? "Untitled"

  let baseDir; 

  if(fileData.slug?.includes("Blogs")) {
    baseDir = "/blog.html"
  } else if(fileData.slug?.includes("ConstructionSite")) {
    baseDir = "/construction.html"
  } else if(fileData.slug?.includes("Projects")) {
    baseDir = "/main.html"
  } else {
    baseDir = pathToRoot(fileData.slug!)
  }

  return (
    <h1 class="page-title">
      <a href={baseDir}>{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
