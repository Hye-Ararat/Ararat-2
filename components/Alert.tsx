export default function Alert({color, title, children, className }) {
    if (!color) color = "info";
    let classColor;
    if (color == "info") classColor = "blue";
    if (color == "danger") classColor = "red";
    if (color == "success") classColor = "green";
    if (color == "warning") classColor="yellow";
    return (
      <>

<div className={`flex p-4 mb-4 text-sm text-${classColor}-700 bg-${classColor}-100 rounded-lg dark:bg-${classColor}-200 dark:text-${classColor}-800 ${className}`} role="alert">
  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <span className="sr-only">{color.charAt(0).toUpperCase() + color.slice(1)}</span>
  <div>
    <span className="font-medium">{title}</span> {children}
  </div>
</div>
</>
    )
}