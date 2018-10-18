package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"

	"net/http/cookiejar"

	"github.com/PuerkitoBio/goquery"
	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"
)

type subject struct {
	Title       string
	Description string
	Lecturer    string
	Date        string
	Venue       string
	Url         string
}
type subjectsRow struct {
	Title string
	Row   []subject
}
type group struct {
	Groups []subjectsRow
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if err := json.NewEncoder(w).Encode(start()); err != nil {
			panic(err)
		}
		//fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})
	log.Fatal(http.ListenAndServe(":8990", nil))

}

func start() group {
	response, err := http.Get("https://www.muthesius-digital.de")
	if err != nil {
		fmt.Printf("%s", err)
		os.Exit(1)
	}
	//c := `<html>something</html>`
	//reader := strings.NewReader(c)
	fmt.Printf("%s", response.Body)
	doc, err := html.Parse(response.Body)

	baseUrl := `https://www.muthesius-digital.de/_inc/events.php?`

	matcher := func(node *html.Node) (keep bool, exit bool) {
		// if node.Type == html.TextNode && strings.TrimSpace(node.Data) != "" {
		// 	keep = true
		// }
		if node.DataAtom == atom.Script {
			keep = true
			exit = true
		}
		return
	}

	nodes := TraverseNode(doc, matcher)
	g := group{}
	for i, node := range nodes {

		if i > 4 {
			//fmt.Println("==============================")
			if len(strings.Split(renderNode(node), "loadEventColumn")) > 1 {
				b := strings.Split(renderNode(node), "loadEventColumn")[1]
				bb := strings.Split(b, ";")[0]
				bb = strings.Replace(bb, "'", "", -1)
				bb = strings.Replace(bb, ")", "", -1)
				bb = strings.Replace(bb, "(", "", -1)
				base := strings.Split(bb, ",")[2]
				bb = strings.Split(bb, ",")[1]
				baseUrl = baseUrl + ""

				url := base + "_ID=" + bb
				fmt.Println(url)

				s := fetch(url)
				sr := subjectsRow{}
				sr.Title = "title"
				sr.Row = s
				g.Groups = append(g.Groups, sr)
			}
		}
	}

	// fmt.Println("================================")
	return g
	// fmt.Println("================================")
}

//to just scape the hell
func TraverseNode(doc *html.Node, matcher func(node *html.Node) (bool, bool)) (nodes []*html.Node) {

	var keep, exit bool
	var f func(*html.Node)
	f = func(n *html.Node) {

		keep, exit = matcher(n)
		if keep {
			nodes = append(nodes, n)
		}
		if exit {
			return
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}

	f(doc)
	return nodes
}

func renderNode(n *html.Node) string {
	var buf bytes.Buffer
	w := io.Writer(&buf)
	html.Render(w, n)
	return buf.String()
}

func fetch(u string) []subject {

	//fmt.Println(u)
	r, _ := http.Get("https://www.muthesius-digital.de/")
	//fmt.Println(r.Cookies()[0].Value)

	//t, _ := url.Parse("https://www.muthesius-digital.de/_inc/events.php?global-semester=SS18&_Studiengang=InDe&_Fachbereich=alle&currentParentPageID=178&")

	jar, _ := cookiejar.New(nil)
	var cookies []*http.Cookie
	cookie := &http.Cookie{
		Name:     "PHPSESSID",
		Value:    r.Cookies()[0].Value,
		Path:     "/",
		Domain:   "muthesius-digital.de",
		HttpOnly: true,
	}
	cookies = append(cookies, cookie)
	ul, _ := url.Parse(`https://www.muthesius-digital.de/_inc/events.php?` + u) // global-semester=SS18&_Studiengang=InDe&_Fachbereich=alle&currentParentPageID=178&`)

	jar.SetCookies(ul, cookies)
	client := &http.Client{
		Jar: jar,
	}
	//fmt.Println(client.Jar.Cookies(ul)[0].Value)
	//fmt.Println("---------------------------")
	//fmt.Println("")
	response, err := client.Get("https://www.muthesius-digital.de/_inc/events.php?" + u) //global-semester=SS18&_Studiengang=InDe&_Fachbereich=alle&currentParentPageID=178&")
	if err != nil {
		fmt.Printf("%s 2222", err)
		os.Exit(1)
	} else {
		defer response.Body.Close()
		//content, err := ioutil.ReadAll(response.Body)

		if err != nil {
			fmt.Printf("%s 3333333", err)
			os.Exit(1)
		}
		//fmt.Println(string(content))
	}

	doc, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var subjects []subject
	// Find the review items
	doc.Find(".show-event-preview").Each(func(i int, s *goquery.Selection) {
		currentSubject := subject{}
		// For each item found, get the band and title

		spaceRemover := regexp.MustCompile(`[\s\p{Zs}]{2,}`)
		currentSubject.Title = spaceRemover.ReplaceAllString(strings.TrimSpace(s.Find(":nth-child(1)").Text()), "")

		currentSubject.Description = strings.TrimSpace(s.Find(":nth-child(2)").Text())
		currentSubject.Lecturer = strings.TrimSpace(s.Find(":nth-child(3)").Text())
		//s.Find(".dozent").Each(func(ii int, sss *goquery.Selection) {
		//	currentSubject.Lecturer = strings.TrimSpace(sss.Find("h3").Text())
		//})
		//s.Find("p").Each(func(iii int, ssss *goquery.Selection) {
		currentSubject.Date = spaceRemover.ReplaceAllString(strings.TrimSpace(s.Find(":nth-child(4)").Text()), "")
		venue := spaceRemover.ReplaceAllString(strings.TrimSpace(s.Find(":nth-child(5)").Text()), "")
		if venue != "Details" {
			currentSubject.Venue = venue
		}
		_url, _ := s.Find("a").Attr("href")
		currentSubject.Url = "https://www.muthesius-digital.de" + _url
		//})
		//currentSubject.url = s.Find("a").

		// band := s.Find("h3").Text()
		// title := s.Find("h2").Text()

		//fmt.Printf("Review %d: %s - %s\n", i+1, currentSubject.title, currentSubject.description)
		subjects = append(subjects, currentSubject)
	})
	return subjects

}
