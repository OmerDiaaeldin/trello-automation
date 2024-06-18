function Top({className}: {className?:string|undefined}) {
  return (
    <div className={`${className} flex items-center justify-center`}>
        <h1 className="font-mono italic font-bold  text-3xl">HPSBot</h1>
    </div>
  )
}

export default Top
