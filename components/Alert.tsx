export default function Alert({color, title, children, className } : {color: string, title: string, children: string, className?: string }) {
    if (!color) color = "info";
    function getColor(color : string) {
      let realColor
      if (color == "info") realColor = "blue";
      if (color == "danger") realColor = "red";
      if (color == "success") realColor = "green";
      if (color == "warning") realColor = "yellow";
      let colorClass = `text-${realColor}-700 bg-${realColor}-100 dark:bg-${realColor}-200`
      return colorClass;
        }
    return (

<div className={`flex p-4 mb-4 text-sm rounded-lg ${getColor(color)} ${className}`} role="alert">
  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <span className="sr-only">{color.charAt(0).toUpperCase() + color.slice(1)}</span>
  <div>
    <span className="font-medium">{title}</span> {children}
  </div>
</div>
    )
}