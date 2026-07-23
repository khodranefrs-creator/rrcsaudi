type PhoneNumberProps = {
  phone: string
  className?: string
}

export function PhoneNumber({ phone, className }: PhoneNumberProps) {
  return (
    <span dir="ltr" className={className} style={{ unicodeBidi: "isolate" }}>
      {phone}
    </span>
  )
}
