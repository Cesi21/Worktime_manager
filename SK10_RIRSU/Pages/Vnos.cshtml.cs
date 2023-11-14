using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.Sqlite;
using System.Data;


namespace SK10_RIRSU.Pages

{
    public class VnosModel : PageModel
    {
        public class Dan
        {
            public string dan { get; set; }
            public string pri { get; set; }
            public string od { get; set; }

        }
        public List<Dan> dnevi { get; set; } 

        public void OnGet()
        {
            
            dnevi = new List<Dan>();

            using (SqliteConnection sqlConnection = new SqliteConnection(@"data source=baza1.db"))
            {
                SqliteCommand sqlCmd = new SqliteCommand("SELECT dan,prihod,odhod FROM vlka", sqlConnection);
                sqlConnection.Open();
                SqliteDataReader sqlReader = sqlCmd.ExecuteReader();

                while (sqlReader.Read())
                {
                    dnevi.Add(new Dan { dan = sqlReader["dan"].ToString(), pri = sqlReader["prihod"].ToString() , od = sqlReader["odhod"].ToString() }
                    );
                }

                sqlReader.Close();
            }
        }
    }
}
