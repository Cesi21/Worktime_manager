using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SK10_RIRSU.Pages
{
    public class IzpisUrModel : PageModel
    {
        
            // Predpostavljamo, da imate nek seznam vnosov ur, ki jih želite prikazati
            public List<VnosUrModel> OpravljeneUre { get; set; }

            public void OnGet()
            {
                // Koda za obdelavo GET zahtevka
                // Tu lahko pridobite seznam opravljenih ur iz podatkovne baze ali drugega vira podatkov
                // Primer: OpravljeneUre = Database.GetOpravljeneUre();
            }
        
        
    }
}
