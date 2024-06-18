function SidebarApplication({title, icon}: {title: string, icon:any}) {
  return (
    <div className={`inline-flex gap-3 font-serif text-xl py-3 rounded-2xl`}>
        {icon}
        {title}
    </div>
  )
}

export default SidebarApplication
