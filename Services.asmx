<%@ WebService Language="C#" Class="Guitarista.Services" %>

using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Services;

namespace Guitarista 
{
    [WebService(Namespace = "http://eadg.be/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Services : System.Web.Services.WebService 
    {


        [WebMethod]
        public string UpdateJson(string data)
        {
            return UpdateJson_Response(data);
        }

            protected static string UpdateJson_Response(string s)
            {
                using (StreamWriter sw = new StreamWriter(HttpContext.Current.Server.MapPath("~/data.txt"), false))
                {                   
                    sw.WriteLine(s); // Write the file.
                }                
                return "processed " + s.Length;
            }      
        
        /*
        [WebMethod]
        public string GetArtist(string name) 
        {
            return GetArtist_Response(name);        
        }
        [WebMethod]
        public string GetArtistEchoNest(string s) 
        {
            return GetArtist_Response_EchoNest(s);
        }
        [WebMethod]
        public string GetSimilarEchoNest(string s)
        {
            return GetSimilar_Response_EchoNest(s);
        }        
        
        [WebMethod]
        public string GetArtistVideos(string s)
        {
            return GetArtistVideos_Response(s);
        }
        */


        
        /*        
        
        protected static string GetArtist_Response(string s)        
        {            
            string q = @"[{
                    ""id"": null,
                    ""name"": """ + s + @""",
                    ""mid"": null,
                    ""key"": [{
                        ""value"": null,
                        ""namespace"": ""/authority/musicbrainz"",
                        ""limit"": 1
                      }],
                    ""type"": ""/music/artist"",
                    ""genre"": [],
                    ""/music/group_member/instruments_played|="": [
                        ""guitar"",
                        ""electric guitar"",
                        ""acoustic guitar""
                    ],
                    ""/music/group_member/membership"": [{
                        ""group"": null,
                        ""mid"": null
                    }]
                }]";

            WebClient client = new WebClient();
            client.QueryString.Add("query", HttpUtility.UrlEncode(q));
            string resp = client.DownloadString("https://www.googleapis.com/freebase/v1/mqlread");
            return resp;
        }
        
        protected static string GetArtist_Response_EchoNest(string s)
        {
            string q = "api_key=I4JCF4EIX2TH5RWLI&name=" + s + "&bucket=images&bucket=news&bucket=terms&bucket=video&results=1";
            WebClient client = new WebClient();
            string resp = client.DownloadString("http://developer.echonest.com/api/v4/artist/search?" + q);
            return resp;            
        }

        protected static string GetSimilar_Response_EchoNest(string s)
        {
            string q = "api_key=I4JCF4EIX2TH5RWLI&name=" + s;
            WebClient client = new WebClient();
            string resp = client.DownloadString("http://developer.echonest.com/api/v4/artist/similar?" + q);
            return resp;
        }        
        
        protected static string GetArtistVideos_Response(string s)
        {
            string q = "part=id,snippet&topicId=" + s + "&maxResults=15&key=AIzaSyC_D1F8ZWa_EGFTmTkQUPhmIPKGAK2sbuI";
            WebClient client = new WebClient();
            string resp = client.DownloadString("https://www.googleapis.com/youtube/v3/search?" + q);
            return resp;
        }        */
    }
}