# Bygg ett klubb-spel

Spelet Whac-a-mole är ett gammalt japanskt arkadspel(https://en.wikipedia.org/wiki/Whac-A-Mole). Spelet går ut på att banka ner så många mullvader som möjligt under den givna tiden med en leksakshammare. Den digitala versionen har samma mål men där leksakshammaren är utbytt mot muspekaren.

Uppgiften går ut på att bygga detta spel med hjälp av de funktionskroppar och filer som skapats.

Reglerna för spelet är följande

- Spelet startar med 0 poäng, 60 sekunder och tomt 3x3 bräde

  - [0][0][0]
  - [0][0][0] = [0,0,0,0,0,0,0,0,0]
  - [0][0][0]

- Spelet skall med slumpmässig intervall ändra så att användaren får fram en mullvad, ex.

  - [0][0][1]
  - [0][0][0] = [0,0,1,0,0,0,0,0,0]
  - [0][0][0]

- Användaren har då X tid på sig att klicka på mullvaden innan den försvinner.
- När användaren lyckats trycka på mullvaden skall den försvinna och användaren tilldelas 1 poäng.
- Tiden skall minskas varje sekund och när den når 0 skall spelet avslutas med hjälp av funktionen setGameRunning(false)
- Försök att inte ändra på currentGameState utanför startGame och låt statet bubbla uppåt t.ex. incrementPoints(moveMoleUp(3, state))

1.  Läs kommentarerna ovanför varje funktion för att se hur det skall fungera.
2.  Fortsätt sedan med att implementera funktionen moveMoleUp och därefter få den att köra i startGame som t.ex. `currentGameState = moveMoleUp(0)` för att se om första rutan blir markerad.
3.  Fortsätt sedan implementera samtliga funktioner enligt kommentarer (för att testa kan du använda knappen "Testa funktioner")
4.  Slutligen implementera slumpbetendet för när en mullvad skall dyka upp och tid ska minskas. Ett bra ställe att göra detta är i startGame med en setInterval.

### 💥 Bonus

- Bygg ett alternativt blitzläge(Time trail).
  Regler
  1 mullvad åt gången.
  Speltid börjar på 10 sekunder.
  Vid klick på mullvad så kommer en ny mullvad och användaren får 1 poäng.
  Vid klick på mullvad nollställs tiden till föregående värde och multipliceras med 0.9. (10 > 9 > 8.1 > 7.29...)
  När anvädaren inte hinner trycka på en mullvad innan tidens slut så är spelet över.

- Styla spelet och gör dom vita rutorna till faktiska mullvadar och rutorna till hål.
