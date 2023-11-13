using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SK10_RIRSU.Pages
{
    public class VnosUrModel : PageModel
    {

        public void OnGet()
        {

        }
        [BindProperty]
        public DateTime Datum { get; set; }

        [BindProperty]
        public DateTime CasPrihoda { get; set; }

        [BindProperty]
        public DateTime CasOdhoda { get; set; }


        public IActionResult OnPost()
        {
            // Koda za obdelavo POST zahtevka
            // Tukaj lahko shranite vnos ur v podatkovno bazo ali izvedete druge potrebne operacije
            // Upoštevajte, da boste morda morali dodati preverjanje veljavnosti podatkov

            // Primer: shranite podatke v neko bazo
            // Database.SaveVnosUr(Datum, CasPrihoda, CasOdhoda);

            // Preusmeritev na drugo stran po uspešnem vnosu
            return RedirectToPage("Uspeh"); // Prilagodite glede na vaše potrebe
        }

    }
}
