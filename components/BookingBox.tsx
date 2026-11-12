import { BookingPanel } from "@/components/BookingPanel";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import type { Bookable } from "@/lib/booking";

/** Digits only, from NEXT_PUBLIC_WHATSAPP_NUMBER. The button is left out until a real number is set. */
function whatsappNumber(): string | null {
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/** The booking panel beside the page on a wide screen. */
export function BookingBox({ item }: { item: Bookable }) {
  return (
    <section id="book" aria-label="Price and dates" className="relative hidden rounded-2xl border border-line bg-card p-5 lg:block">
      <BookingPanel item={item} whatsapp={whatsappNumber()} />
    </section>
  );
}

/** The same panel as a bottom sheet on phones and tablets. */
export function MobileBooking({ item }: { item: Bookable }) {
  return <StickyBookingBar item={item} whatsapp={whatsappNumber()} />;
}
