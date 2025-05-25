// ------------------------- GAME DATA ARRAYS -------------------------
const GAME_DATA = [
  { 
    name: "Forza Horizon 5",
    vehicles: [
      "1926 Bugatti Type 35 C","1929 Mercedes-Benz SSK","1930 Bentley 8 Litre","1930 Bentley Blower 4-1/2 Litre Supercharged","1939 Auto Union Type D","1939 Maserati 8CTF","1939 Mercedes-Benz W154","1954 Mercedes-Benz 300 SL Coupe","1955 Mercedes-Benz 300 SLR","1957 BMW Isetta 300 Export","1958 Aston Martin DBR1","1958 Austin-Healey Sprite MkI","1962 Lincoln Continental","1964 Aston Martin DB5","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Alfa Romeo Giulia TZ2","1965 MINI Cooper S","1965 MINI Cooper S Forza Edition","1967 Lamborghini Miura P400","1967 Mercedes-Benz 280 SL","1968 Abarth 595 esseesse","1968 Alfa Romeo 33 Stradale","1968 Lancia Fulvia Coupe Rallye 1.6 HF","1969 Lola #6 Penske Sunoco T70 MkIIIB","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Mercury Cyclone Spoiler","1971 AMC Javelin AMX","1971 Lotus Elan Sprint","1971 Meyers Manx","1971 Meyers Manx Forza Edition","1972 Land Rover Series III","1973 Alpine A110 1600s","1973 AMC Gremlin X","1973 BMW 2002 Turbo","1973 Lamborghini Espada 400 GT","1973 Land Rover Range Rover","1974 Lancia Stratos HF Stradale","1979 Chevrolet Camaro Z28","1980 Abarth Fiat 131","1980 Lotus Esprit Turbo","1981 BMW M1","1983 Audi Sport quattro","1986 Audi #2 Audi Sport quattro S1","1986 BMW M635CSi","1986 Lamborghini LM 002","1986 Lancia Delta S4","1986 MG Metro 6R4","1987 Buick Regal GNX","1987 Mercedes-Benz AMG Hammer Coupe","1987 Mercedes-Benz AMG Hammer Wagon","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Lamborghini Countach LP5000 QV","1990 Aston Martin Lagonda","1990 Mazda Savanna RX-7","1990 Mercedes-Benz 190E 2.5-16 Evolution II","1991 Bentley Turbo R","1991 BMW M3","1991 BMW X5 M","1992 Alfa Romeo 155 Q4","1992 Bugatti EB110 Super Sport","1992 Lancia Delta HF Integrale EVO","1992 Mazda 323 GT-R","1992 Mercedes-Benz 500 E","1993 Autozam AZ-1","1993 McLaren F1","1994 Mazda MX-5 Miata","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 BMW M5","1995 Chevrolet Corvette ZR-1","1995 Mitsubishi Lancer Evolution III GSR","1996 Chevrolet Impala Super Sport","1997 BMW M3","1997 Lamborghini Diablo SV","1997 Lexus SC300","1997 Lotus Elise GT1","1997 McLaren F1 GT","1997 Mazda RX-7","1997 Mitsubishi GTO","1997 Mitsubishi Montero Evolution","1998 Mercedes-Benz AMG CLK GTR","1998 Mercedes-Benz AMG CLK GTR Forza Edition","1998 Mitsubishi FTO GP Version R","1999 Lamborghini Diablo GTR","1999 Lotus Elise Series 1 Sport 190","1999 Mitsubishi Lancer Evolution VI GSR","2000 Lotus 340R","2001 Acura Integra Type-R","2001 Audi RS 4 Avant","2002 Acura RSX Type-S","2002 BMW M3-GTR","2002 BMW Z3 M Coupe","2002 Chevrolet Corvette Z06","2002 Lotus Esprit V8","2002 Mazda RX-7 Spirit R Type-A","2003 Audi RS 6","2003 BMW M5","2004 Mitsubishi Lancer Evolution VIII MR","2005 BMW M3","2005 Mazda Mazdaspeed MX-5","2005 MG XPower SV-R","2005 Mitsubishi #1 Sierra Enterprises Lancer Evolution Time Attack","2005 Nissan 350Z Nismo","2006 Audi S4","2006 BMW Z4 M Roadster","2006 Chevrolet Corvette Z06","2007 BMW 335i","2007 Ferrari F430 Scuderia","2007 Porsche 911 Turbo","2008 Audi RS4","2008 BMW M3","2008 Chevrolet Corvette ZR1","2008 Dodge Viper SRT10 ACR","2008 Mitsubishi Lancer Evolution X GSR","2009 Ford Focus RS","2009 Nissan GT-R","2009 Porsche 911 Carrera S","2010 Aston Martin V12 Vantage","2010 Audi R8 5.2 FSI Quattro","2010 BMW M5","2010 Chevrolet Camaro SS","2010 Dodge Challenger SRT8","2010 Ford Shelby GT500","2011 Lamborghini Gallardo LP 570-4 Superleggera","2011 Porsche 911 GT3 RS 4.0","2012 Bugatti Veyron 16.4 Super Sport","2012 Chevrolet Corvette ZR1","2012 Ferrari 458 Italia","2013 McLaren P1","2013 Nissan GT-R Black Edition","2013 Pagani Huayra","2014 Chevrolet Camaro Z28","2014 Jaguar F-Type R","2015 Ford Mustang GT350","2015 Mercedes-Benz AMG GT","2015 Porsche 911 GT3 RS","2016 Audi R8 V10 Plus","2016 BMW M4 GTS","2016 Chevrolet Camaro ZL1","2016 Ford Focus RS","2016 Nissan GT-R Nismo","2016 Porsche 911 Turbo S","2017 Alfa Romeo Giulia Quadrifoglio","2017 Audi RS3","2017 Bugatti Chiron","2017 Chevrolet Corvette Grand Sport","2017 Dodge Viper ACR","2017 Ford GT","2017 Porsche 911 GT2 RS","2018 Aston Martin Vantage","2018 BMW M5","2018 Ferrari 488 Pista","2018 Ford Mustang GT","2018 Nissan GT-R","2019 Audi RS5","2019 BMW Z4 M40i","2019 Chevrolet Corvette ZR1","2019 Ferrari F8 Tributo","2019 Lamborghini Aventador SVJ","2019 McLaren 720S","2020 Aston Martin DBS Superleggera","2020 Audi RS7","2020 BMW M8 Competition","2020 Bugatti Chiron Pur Sport","2020 Chevrolet Corvette Stingray","2020 Ferrari 812 GTS","2020 Ford Mustang Shelby GT500","2020 Lamborghini Huracán EVO","2020 Nissan GT-R Nismo","2021 Audi RS5 Coupe","2021 BMW M4","2021 Ferrari SF90 Stradale","2021 Ford Mustang Mach 1","2021 Lamborghini Huracán STO","2021 McLaren Artura","2021 Porsche 911 Turbo S","2021 Toyota Supra","2022 Chevrolet Camaro ZL1","2022 Ford Bronco Raptor","2022 Hyundai N Vision 74","2022 Lamborghini Countach LPI 800-4","2022 Porsche 911 GT3 RS","2023 Aston Martin Valhalla","2023 BMW M2","2023 Chevrolet Corvette Z06","2023 Dodge Charger SRT Hellcat","2023 Ferrari 296 GTB","2023 Ford F-150 Raptor R","2023 Lamborghini Revuelto","2023 McLaren Solus GT","2023 Nissan Z","2023 Pagani Utopia","2023 Porsche 911 Dakar","2023 Toyota GR86","2024 Alfa Romeo Tonale","2024 Audi RS Q8","2024 BMW i4 M50","2024 Cadillac Lyriq","2024 Chevrolet Silverado EV","2024 Dodge Ram 1500 REV","2024 Ferrari Purosangue","2024 Ford Mustang Mach-E GT","2024 Genesis GV80","2024 Hyundai Ioniq 6","2024 Infiniti QX80","2024 Jaguar F-Type","2024 Lamborghini Huracán Tecnica","2024 Lexus LX 600","2024 Lucid Air Dream Edition","2024 Maserati Grecale Trofeo","2024 Mazda CX-90","2024 Mercedes-Benz EQS","2024 Nissan Ariya","2024 Porsche Taycan Turbo S","2024 Rivian R1T","2024 Rolls-Royce Spectre","2024 Subaru WRX STI","2024 Tesla Model S Plaid","2024 Toyota Sequoia","2024 Volkswagen ID. Buzz","2024 Volvo XC90 Recharge"
    ],
   
    tracks: ["Drag","Roll Racing","Circuit","Sprint","Drift (Beta)","Rally (Beta)","Cruise"
]
  },

  { name: "Forza Motorsports", vehicles: ["1926 Bugatti Type 35 C","1939 Auto Union Type D","1958 Aston Martin DBR1","1960 Aston Martin DB4 GT Zagato","1964 Aston Martin DB5","1964 Brabham BT8","1964 Chevron B16","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Austin-Healey 3000 MkIII","1966 Chaparral #66 2E","1967 Aston Martin DBS","1967 Brabham BT24","1967 Chevrolet Corvette Stingray 427","1969 Chevrolet Nova Super Sport 396","1969 Chevrolet Camaro Jordan Luka 3 Motorsport Edition","1969 Chevrolet Camaro Super Sport Coupe","1969 Datsun 2000 Roadster","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Chevrolet Corvette ZR-1","1970 Chevrolet Chevelle Super Sport 454","1970 Chevrolet Camaro Z28","1970 Datsun 510","1971 AMC Javelin AMX","1972 Chrysler VH Valiant Charger R/T E49","1973 BMW 2002 Turbo","1974 BRM #14 P201","1975 BMW #25 3.0 CSL","1976 BMW #1 3.0 CSL","1976 Chevrolet #76 Greenwood Corvette","1979 BMW #6 M1 Procar","1979 Datsun #33 280ZX Turbo","1981 BMW M1", "2024 Porsche #5 Porsche Penske Motorsport 963", "1981 Porsche #1 Porsche System Engineering 924 GTP Le Mans", "1984 Audi Sport quattro","1984 De Tomaso Pantera GT5","1985 Buick #6 Somerset Regal Trans-Am","1986 BMW M635 CSi","1987 Buick Regal GNX","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Chevrolet #77 Beretta Trans Am","1989 Aston Martin #18 AMR1","1989 Audi #4 90 quattro IMSA GTO","1990 Alpine GTA Le Mans","1990 Chevrolet Camaro IROC-Z","1991 BMW M3","1992 Bugatti EB110 Super Sport","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 Chevrolet Corvette ZR-1","1997 BMW M3","1998 Aston Martin V8 Vantage V600","1999 BMW #16 V12 LMR","1999 BMW #15 V12 LMR","2000 BMW 323ti Sport","2001 Acura Integra Type R","2001 Aston Martin V12 Vanquish","2001 Audi RS 4 Avant","2002 BMW M3-GTR","2002 BMW Z3 M Coupé","2002 Chevrolet Corvette Z06","2002 Chevrolet Camaro 35th Anniversary Super Sport","2003 Audi RS 6","2003 Bentley #7 Speed 8","2003 BMW M5","2004 Audi S4","2005 BMW M3","2006 Audi RS 4","2008 Aston Martin DBS","2008 BMW M3","2009 BMW M5","2009 Chevrolet Corvette ZR1","2010 Audi R8 5.2 FSI quattro","2010 BMW M3 GTS","2010 BMW M6 Coupé","2010 Chevrolet #55 Oreca FLM09","2011 Alfa Romeo Giulietta Quadrifoglio Verde","2011 Audi RS 3 Sportback","2011 BMW 1 Series M Coupé","2011 Bugatti Veyron Super Sport","2011 Citroën DS 3 Racing","2012 BMW M5","2013 Ariel Atom 500 V8","2013 Aston Martin V12 Vantage S","2013 Audi R8 V10 plus","2013 Audi RS 7 Sportback","2013 Audi RS 4 Avant","2013 BMW M6 Coupé","2013 Caterham Superlight R500", "2013 Shelby GT500", "2014 Alfa Romeo 4C","2014 Audi #2 R18 e-tron quattro","2014 BAC Mono","2014 Bentley #17 Continental GT3","2014 BMW M4 Coupé","2014 Cadillac CTS-V Sport Wagon","2014 Chevrolet #3 Corvette C7.R","2015 Aston Martin Vantage GT12","2015 Audi RS 6 Avant","2015 Audi S1","2015 BMW i8","2015 Cadillac #3 ATS-V.R","2015 Chevrolet #10 Daytona Prototype","2015 Chevrolet Corvette Z06","2016 Aston Martin Vulcan","2016 Audi #17 TT RS","2016 Audi R8 V10 plus","2016 BMW M4 GTS","2016 Cadillac CTS-V Sedan","2016 Cadillac ATS-V","2016 Chevrolet Camaro Super Sport","2017 Abarth 124 Spider","2017 Acura NSX","2017 Alfa Romeo Giulia Quadrifoglio","2017 Alpine A110","2017 Aston Martin Vulcan AMR Pro","2017 Aston Martin #7 V12 Vantage GT3","2017 Aston Martin Vanquish Zagato Coupe","2017 Bentley Continental Supersports","2017 BMW #24 M6 GTLM","2017 Chevrolet Camaro ZL1","2018 Acura #36 NSX GT3","2018 Apollo Intensa Emozione","2018 Aston Martin #97 AMR Vantage GTE","2018 Audi #44 R8 LMS GT3","2018 Audi #1 RS 3 LMS","2018 Audi TT RS","2018 Audi RS 5 Coupe","2018 Audi RS 4 Avant","2018 BMW #1 M8 GTE","2018 BMW M5","2018 Bugatti Chiron","2018 Cadillac #57 TA CTS-V","2018 Chevrolet #23 TA Corvette","2018 Chevrolet Camaro ZL1 1LE Forza Edition","2018 Chevrolet Camaro ZL1 1LE","2019 Aston Martin Valhalla Concept Car","2019 Aston Martin DBS Superleggera","2019 Aston Martin Vantage","2019 BMW Z4 Roadster","2019 Brabham BT62","2019 Bugatti Divo","2019 Chevrolet Corvette ZR1","2020 Acura #6 ARX-05 DPi","2020 Audi R8 V10 performance","2020 Audi TT RS Coupe","2020 Audi RS 3 Sedan","2020 Automobili Pininfarina Battista","2020 BMW M8 Competition Coupé","2020 BMW M2 Competition Coupé","2020 Chevrolet #3 C8.R","2020 Chevrolet Corvette Stingray Coupe Forza Edition","2020 Chevrolet Corvette Stingray Coupe","2021 Audi RS e-tron GT","2021 Audi RS 6 Avant","2021 Audi RS 7 Sportback","2021 BMW M3 Competition Sedan","2021 BMW M4 Competition Coupé","2021 Cadillac #31 DPi-V.R","2022 Acura NSX Type S","2022 Aston Martin Valkyrie AMR Pro","2022 Cadillac CT5-V Blackwing","2022 Cadillac CT4-V Blackwing","2023 Aston Martin Valkyrie","2023 BMW #25 M Hybrid V8","2023 BMW #96 M4 GT3","2023 BMW M2","2023 Cadillac #31 V-Series.R","2023 Cadillac #2 V-Series.R","2023 Cadillac #01 V-Series.R","2023 Chevrolet Corvette Z06","2023 Porsche 911 GT3 R", "2023 Porsche 911 Turbo S", "2024 Mustang Dark Horse", "2023 Ford #65 Ford Multimatic Motorsports Mustang GT3", "2024 #25 Mustang RTR", "2024 #88 Mustang RTR", "2024 #130 Mustang RTR", "2024 Chevrolet NASCAR Camaro ZL1","2024 Chevrolet Corvette E-Ray"
], 
   
   tracks: ["Bathurst (Mount Panorama Circuit)","Brands Hatch GP","Brands Hatch Indy","Catalunya GP","Catalunya National","Catalunya National Alt","Circuit de Spa","Daytona 24hr Sports Car","Daytona Tri-Oval","Eaglerock Club-R","Eaglerock Oval","Grand Oak Club","Grand Oak National","Grand Oak National-R","Hakone Club","Hakone Club-R","Hakone Grand Prix","Hockenheimring Full","Hockenheimring National","Hockenheimring Short","Homestead Road","Homestead Speedway","Indianapolis Brickyard Oval","Indianapolis GP","Kyalami Grand Prix","Laguna Seca Full","Laguna Seca Short","Le Mans La Sarthe Full","Le Mans Old Mulsanne","Lime Rock Full","Lime Rock Full Alt","Lime Rock South","Maple Valley","Maple Valley Short","Maple Valley Short-R","Mid-Ohio","Mid-Ohio Short","Mugello Club","Mugello Full","Nurburgring Full","Nurburgring GP","Nurburgring Nordschleife","Nurburgring Sprint","Road America","Road America East","Road Atlanta","Road Atlanta Short","Sebring Full","Sebring Short","Silverstone GP","Silverstone International","Silverstone National","Sunset Peninsula Club","Sunset Peninsula Club-R","Sunset Peninsula Full","Sunset Peninsula Full-R","Sunset Peninsula Speedway","Suzuka East","Suzuka Full","VIR Full","VIR Grand East","VIR Grand West","VIR North","VIR South","Watkins Glen Full","Watkins Glen Short","Yas Marina Full","Yas Marina North","Yas Marina North Corkscrew","Yas Marina South"
] },

  { name: "Assetto Corsa", vehicles: ["Abarth 500 Assetto Corse","Abarth 500 EsseEsse","Abarth 500 EsseEsse Step 1","Abarth 595 SS","Abarth 595 SS Step 1","Abarth 595 SS Step 2","Alfa Romeo 33 Stradale","Alfa Romeo 4C","Alfa Romeo 155 Ti V6","Alfa Romeo GTA","Alfa Romeo Giulia Quadrifoglio","Alfa Romeo Giulietta QV","Alfa Romeo Giulietta QV Launch Edition 2014","Alfa Romeo Mito QV","Audi R8 LMS Ultra","Audi R18 e-tron Quattro","Audi R8 LMS 2016","Audi Sport Quattro","Audi Sport Quattro S1 E2","Audi Sport Quattro Step 1","Audi TT Cup","Audi TT RS VLN","BMW 1M Coupe","BMW 1M Coupe Stage 3","BMW M3 E30","BMW M3 E30 Drift","BMW M3 E30 Group A 92","BMW M3 E30 Group A","BMW M3 E30 Step 1","BMW M3 E92","BMW M3 E92 Step 1","BMW M3 E92 Drift","BMW M3 GT2","BMW M4 Coupe Akrapovic Edition","BMW M4 Coupe","BMW Z4 E89 35is","BMW Z4 E89 Drift","BMW Z4 E89 Step 1","BMW Z4 GT3","Chevrolet Corvette C7R","Ferrari 312T","Ferrari 458 GT2","Ferrari 458 Italia","Ferrari 458 Italia Stage 3","Ferrari 599XX Evo","Ferrari F40","Ferrari F40 Stage 3","Ferrari FXX K","Ferrari LaFerrari","Ferrari SF 15-T","Ferrari F138","Ferrari 488 GT3","Ferrari FXX K","Ferrari 488 GTB","Ford Escort RS 1600","Ford GT40","Ford Focus RS 1600","Ford GT40 MKI","KTM X-Bow R","Lamborghini Countach","Lamborghini Countach S1","Lamborghini Gallardo Superleggera Step 3","Lamborghini Huracan GT3","Lamborghini Huracan Performante","Lamborghini Huracan Super Trofeo","Lamborghini Miura","Lamborghini Sesto Elemento","Lotus 2-Eleven","Lotus 2-Eleven GT4","Lotus Elise SC","Lotus Elise SC Step 1","Lotus Elise SC Step 2","Lotus Evora GTC","Lotus Evora GTE","Lotus Evora GTE Carbon","Lotus Evora GX","Lotus Evora S","Lotus Evora S Stage 2","Lotus Exige 240R","Lotus Exige 240R Stage 3","Lotus Exige S","Lotus Exige S Roadster","Lotus Exige Scura","Lotus Exige V6 CUP","Lotus Exos T125","Lotus Exos T125 Stage 1","Lotus Type 25","Lotus Type 72D","Lotus Classics","Lotus Type 49","Lotus Type 98T","Maserati Alfieri","Maserati Levante S","Maserati Quattroporte GTS","Maserati 250F 6C","Maserati 250F T2 12C","Maserati GranTurismo MC GT4","Mazda 787B","Mazda MX-5 Miata NA","Mazda MX-5 ND","Mazda MX-5 Cup","Mazda RX-7 Spirit R","Mazda RX-7 Spirit R Tuned","McLaren 650S GT3","McLaren F1 GTR","McLaren MP4-12C","McLaren MP4-12C GT3","McLaren P1","McLaren P1 GTR","McLaren 570S","Mercedes-Benz SLS AMG","Mercedes-Benz SLS AMG GT3","Mercedes-Benz 190E Evo II","Mercedes-Benz AMG GT3","Mercedes-Benz C9 1989 LM","Nissan GT-R NISMO GT3","Nissan 370Z NISMO","Nissan R34 GT-R Skyline V-Spec","Pagani Huayra","Pagani Huayra BC","Pagani Zonda R","Porsche Cayenne Turbo S","Porsche Macan Turbo","Porsche Panamera G2","Porsche 935 78 Moby Dick","Porsche 991 Carrera S","Porsche 918 Spyder","Porsche 911 Carrera RSR","Porsche 718 Cayman S","Porsche 917/30 Spyder","Porsche 935/78 ‘Moby Dick’","Porsche Cayman GT4 Clubsport","Porsche 911 GT3 RS","Porsche 718 RS 60 Spyder","Porsche Cayman GT4","Porsche 718 Boxster S","Porsche 718 Boxster S PDK","Porsche 919 Hybrid 2015","Porsche 911 GT1","Porsche 962C LT (Long Tail)","Porsche 962 C ST (Short Tail)","Porsche 911 RSR 2017","Porsche 911 GT3 Cup 2017","Porsche 911 GT3 R 2016","Porsche 919 Hybrid 2016","Porsche 908 LH","Porsche 917 K","Porsche 911 R","Porsche 911 Turbo S 991","Praga R1","RUF CTR Yellowbird","RUF RT 12R","RUF RT 12R AWD","Scuderia Glickenhaus P4/5 Competizione","Scuderia Glickenhaus SCG003","Shelby Cobra 427 S/C","Tatuus FA01","Toyota Supra MK IV","Toyota Supra MK IV Drift","Toyota MK IV Time Attack","Toyota AE86","Toyota AE86 Drift","Toyota AE86 Tuned","Toyota Celica ST185","Toyota TS040 Hybrid"
], 
   
   tracks: ["Autodromo dell’Umbria – Magione","Autodromo Internazionale del Mugello","Autodromo Internazionale Enzo e Dino Ferrari – Imola","Autodromo Nazionale di Monza","Autodromo Piero Taruffi – Vallelunga","Black Cat County","Brands Hatch","Circuit de Barcelona-Catalunya – Barcelona","Circuit Park Zandvoort","Circuit de Spa-Francorchamps","Drag Strip","Drift","Highlands","Laguna Seca","Nürburgring","Nürburgring Nordschleife","Red Bull Ring","Silverstone Circuit","Trento-Bondone Hill Climb"
] },

  { name: "Assetto Corsa Competizione", vehicles: ["1926 Bugatti Type 35 C","1929 Mercedes-Benz SSK","1930 Bentley 8 Litre","1930 Bentley Blower 4-1/2 Litre Supercharged","1939 Auto Union Type D","1939 Maserati 8CTF","1939 Mercedes-Benz W154","1954 Mercedes-Benz 300 SL Coupe","1955 Mercedes-Benz 300 SLR","1957 BMW Isetta 300 Export","1958 Aston Martin DBR1","1958 Austin-Healey Sprite MkI","1962 Lincoln Continental","1964 Aston Martin DB5","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Alfa Romeo Giulia TZ2","1965 MINI Cooper S","1965 MINI Cooper S Forza Edition","1967 Lamborghini Miura P400","1967 Mercedes-Benz 280 SL","1968 Abarth 595 esseesse","1968 Alfa Romeo 33 Stradale","1968 Lancia Fulvia Coupe Rallye 1.6 HF","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Mercury Cyclone Spoiler","1971 AMC Javelin AMX","1971 Lotus Elan Sprint","1971 Meyers Manx","1972 Land Rover Series III","1973 Alpine A110 1600s","1973 AMC Gremlin X","1973 BMW 2002 Turbo","1973 Lamborghini Espada 400 GT","1973 Land Rover Range Rover","1974 Lancia Stratos HF Stradale","1979 Chevrolet Camaro Z28","1980 Abarth Fiat 131","1980 Lotus Esprit Turbo","1981 BMW M1","1983 Audi Sport quattro","1986 Audi #2 Audi Sport quattro S1","1986 BMW M635CSi","1986 Lamborghini LM 002","1986 Lancia Delta S4","1986 MG Metro 6R4","1987 Buick Regal GNX","1987 Mercedes-Benz AMG Hammer Coupe","1987 Mercedes-Benz AMG Hammer Wagon","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Lamborghini Countach LP5000 QV","1990 Aston Martin Lagonda","1990 Mazda Savanna RX-7","1990 Mercedes-Benz 190E 2.5-16 Evolution II","1991 Bentley Turbo R","1991 BMW M3","1991 BMW X5 M","1992 Alfa Romeo 155 Q4","1992 Bugatti EB110 Super Sport","1992 Lancia Delta HF Integrale EVO","1992 Mazda 323 GT-R","1992 Mercedes-Benz 500 E","1993 Autozam AZ-1","1993 McLaren F1","1994 Mazda MX-5 Miata","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 BMW M5","1995 Chevrolet Corvette ZR-1","1995 Mitsubishi Lancer Evolution III GSR","1996 Chevrolet Impala Super Sport","1997 BMW M3","1997 Lamborghini Diablo SV","1997 Lexus SC300","1997 Lotus Elise GT1", "1997 FD #777 240SX", "1997 McLaren F1 GT","1997 Mazda RX-7","1997 Mitsubishi GTO","1997 Mitsubishi Montero Evolution","1998 Mercedes-Benz AMG CLK GTR","1998 Mercedes-Benz AMG CLK GTR Forza Edition","1998 Mitsubishi FTO GP Version R","1999 Lamborghini Diablo GTR","1999 Lotus Elise Series 1 Sport 190","1999 Mitsubishi Lancer Evolution VI GSR","2000 Lotus 340R","2001 Acura Integra Type-R","2001 Audi RS 4 Avant","2002 Acura RSX Type-S","2002 BMW M3-GTR","2002 BMW Z3 M Coupe","2002 Chevrolet Corvette Z06","2002 Lotus Esprit V8","2002 Mazda RX-7 Spirit R Type-A","2003 Audi RS 6","2003 BMW M5","2004 Mitsubishi Lancer Evolution VIII MR","2005 BMW M3","2005 Mazda Mazdaspeed MX-5","2005 MG XPower SV-R","2005 Mitsubishi #1 Sierra Sierra Enterprises Lancer Evolution Time Attack","2006 Audi RS 4","2006 Mercedes-Benz E 55 AMG Wagon","2006 Mitsubishi Lancer Evolution IX MR","2007 Alfa Romeo 8C Competizione","2008 Aston Martin DBS","2008 BMW M3","2008 BMW Z4 M Coupe","2008 Lamborghini Reventon","2008 Lotus 2-Eleven","2008 MINI John Cooper Works Countryman ALL4","2008 MINI X-Raid John Cooper Works Buggy","2008 Mitsubishi Lancer Evolution X GSR","2023 Aston Martin Valkyrie","2023 BMW M2","2023 Chevrolet Corvette Z06","2023 Dodge Charger SRT Hellcat","2023 Ferrari 296 GTB","2023 Ford F-150 Raptor R","2023 Lamborghini Revuelto","2023 McLaren Solus GT","2023 Nissan Z","2023 Pagani Utopia","2023 Porsche 911 Dakar","2023 Toyota GR86","2024 Alfa Romeo Tonale","2024 Audi RS Q8","2024 BMW i4 M50","2024 Cadillac Lyriq","2024 Chevrolet Silverado EV","2024 Dodge Ram 1500 REV","2024 Ferrari Purosangue","2024 Ford Mustang Mach-E GT"
], 
   
   tracks: ["24H Nürburgring (Nordschleife)","Autodromo Internazionale Enzo e Dino Ferrari – Imola","Barcelona","Brands Hatch","Circuit of the Americas (COTA)","Circuit Ricardo Tormo (Valencia)","Donington Park","Hungaroring","Indianapolis","Kyalami Grand Prix Circuit","Misano","Monza","Mount Panorama Circuit","Nürburgring","Oulton Park","Paul Ricard","Red Bull Ring","Snetterton","Silverstone","Spa-Francochamps","Suzuka Circuit","Watkins Glen","Weathertech Raceway Laguna Seca","Zandvoort","Zolder"
] },

  { name: "Gran Turismo 7", vehicles: ["1932 Ford Roadster ’63","Abarth 1500 Biposto Bertone B.A.T 1 ’52","Abarth 500 ’09","Afeela Prototype 2024","Alfa Romeo 155 2.5 V6 TI ’93","Alfa Romeo 4C Launch Edition ’14","Alfa Romeo 4C Road Car","Alfa Romeo 4C","Alfa Romeo 8C 2900B Touring Berlinetta ’38","Alfa Romeo 8C Competizione ’08","Alfa Romeo Giulia Sprint GT Veloce ’67","Alfa Romeo Giulia GTAm ’20","Alfa Romeo GIULIA TZ2 carrozzata da ZAGATO ’65","Alfa Romeo MiTo 1.4 T Sport ’09","Alpine A110 1600S ’72","Alpine A110 Première Édition ’17","Alpine A220 Race Car ’68","Alpine Vision Gran Turismo","Alpine Vision Gran Turismo Race Mode","Alpine Vision Gran Turismo 2017","Amuse NISMO 380RS Super Leggera","Amuse S2000 GT1 Turbo","Aston Martin DB3S ’53","Aston Martin DB5 ’64","Aston Martin DB11 ’16","Aston Martin DBR9 GT1 ’10","Aston Martin DP-100 Vision Gran Turismo","Aston Martin One-77 ’11","Aston Martin V8 Vantage S ’15","Aston Martin Vantage ’18","Aston Martin Vantage","Aston Martin Vulcan ’16","Audi R18 ’16","Audi R18 TDI ’11","Audi R8 4.2 FSI R tronic ’07","Audi R8 Coupé V10 plus ’16","Audi R8 LMS Evo ’19","Audi R8 LMS ’15","Audi RS 5 Turbo DTM ’19","Audi Sport quattro S1 Pikes Peak ’87","Audi TT Coupé 3.2 quattro ’03","Audi TTS Coupé ’09","Audi TTS Coupé ’14","Audi TT Cup ’16","Audi Vision Gran Turismo","Audi e-tron Vision Gran Turismo","Autobianchi A112 Abarth ’85","BAC Mono ’16","BMW 3.0 CSL ’71","BMW 3.0 CSL ’73","BMW i3 ’15","BMW M2 Competition ’18","BMW M3 Sport Evolution ’89","BMW M3 ’89","BMW M3 ’97","BMW M3 Coupé ’03","BMW M3 Coupé ’07","BMW M3 GT ’11","BMW M4 Coupé ’14","BMW M4 Safety Car","BMW M6 GT3 Endurance Model ’16","BMW M6 GT3 Sprint Model ’16","BMW McLaren F1 GTR Race Car ’97","BMW Vision Gran Turismo","BMW Z4 3.0i ’03","BMW Z4 GT3 ’11","BMW Z8 ’01","Bugatti Chiron ’16","Bugatti Veyron 16.4 ’13","Bugatti Vision Gran Turismo","BVLGARI Aluminium Vision Gran Turismo","Chaparral 2J ’70","Chaparral 2X Vision Gran Turismo","Chevrolet Camaro Z28 ’69","Chevrolet Camaro SS ’16","Chevrolet Camaro ZL1 1LE Package ’18","Chevrolet Chevelle SS 454 Sport Coupé ’70","Chevrolet Corvette (C1) ’58","Chevrolet Corvette Stingray Racer Concept ’59","Chevrolet Corvette (C2) ’63","Chevrolet Corvette Stingray (C3) ’69","Chevrolet Corvette Stingray Convertible (C3) ’69","Chevrolet Corvette ZR-1 (C4) ’89","Chevrolet Corvette Z06 (C5) ’01","Chevrolet Corvette ZR1 (C6) ’09","Chevrolet Corvette Stingray (C7) ’14","Chevrolet Corvette C7 ZR1 ’19","Chevrolet Corvette C7","Chris Holstrom Concepts 1967 Chevy Nova","Citroën DS 21 Pallas ’70","Citroën GT by Citroën Road Car","Citroën GT by Citroën Race Car","Daihatsu Copen Active Top ’02","Daihatsu COPEN RJ Vision Gran Turismo","De Tomaso Mangusta ’69","De Tomaso Mangusta (Christian Dior)*","De Tomaso Pantera ’71","DMC DeLorean S2 ’04","Dodge Challenger R/T ’70","Dodge Challenger SRT Demon ’18","Dodge Charger R/T 426 Hemi ’68","Dodge Charger SRT Hellcat ’15","Dodge Charger SRT Hellcat Safety Car","Dodge Super Bee ’70","Dodge Viper GTS ’02","Dodge Viper SRT10 Coupe ’06","Dodge Viper GTS ’13","SRT Tomahawk S Vision Gran Turismo","SRT Tomahawk Vision Gran Turismo","SRT Tomahawk GTS-R Vision Gran Turismo","SRT Tomahawk X Vision Gran Turismo","DS 3 Racing ’11","Eckert’s Rod & Custom Mach Forty","Enzo Ferrari ’02","Ferrari 250 GT Berlinetta passo corto ’61","Ferrari 250 GTO ’62","Ferrari 308 GTB ’75","Ferrari 330 P4 ’67","Ferrari 365 GTB4 ’71","Ferrari 430 Scuderia ’07","Ferrari 458 Italia ’09","Ferrari 458 Italia GT3","Ferrari 458 Italia","Ferrari 500 Mondial Pinin Farina Coupe ’54","Ferrari 512BB ’76","Ferrari 812 Superfast ’17","Ferrari Dino 246 GT ’71","Ferrari F8 Tributo ’19","Ferrari F12berlinetta ’12","Ferrari F40 ’92","Ferrari F50 ’95","Ferrari F430 ’06","Ferrari FXX K ’14","Ferrari GTO ’84","Ferrari LaFerrari ’13","Ferrari Testarossa ’91","Ferrari Vision Gran Turismo","Fiat 500 F ’68","Fiat 500 1.2 8V Lounge SS ’08","Fiat Abarth 595 Esseesse ’70","Ford Escort RS Cosworth ’92","Ford F-150 SVT Raptor ’11","Ford Focus ST ’15","Ford Focus RS ’18","Ford GT ’06","Ford GT ’17","Ford GT LM Race Car Spec II","Ford GT LM Spec II Test Car","Ford GT160 ’18","Ford GT40 ’66","Ford Mark IV Race Car ’67","Ford Mustang Boss 429 ’69","Ford Mustang Mach 1 ’71","Ford Mustang GT Premium Fastback ’15","Ford Mustang","1932 Ford Roadster ’63","Ford Shelby GT350R ’16","Ford Sierra RS 500 Cosworth ’87","Garage RCR Civic","Genesis G70 3.3T AWD Prestige Package ’22","Genesis G70","Genesis X Vision Gran Turismo","Gran Turismo F1500T-A","Gran Turismo F3500-A","Gran Turismo Racing Kart 125 Shifter","Greening Auto Company Maverick","GReddy Fugu Z","Honda Beat ’91","Honda Civic Si Extra (EF) ’87","Honda Civic SiR II (EG) ’93","Honda Civic Type R (EK) ’97","Honda Civic Type R (EK) Touring Car","Honda Civic Type R (EK) ’98","Honda Civic Type R (FK2) ’15","Honda Civic Type R Limited Edition (FK8) ’20","Honda Civic Type R (FL5) ’22","Honda CR-V e:HEV EX ・Black Edition ’21","Honda Fit Hybrid ’14","Honda Integra Type R (DC2) ’95","Honda Integra Type R (DC2) ’98","Honda NSX ’17","Honda NSX Type R ’92","Honda NSX Type R ’02","Honda NSX CONCEPT-GT ’16","Honda NSX GT500 ’00","Honda NSX GT500 ’08","Honda Project 2&4 powered by RC213V","Honda RA272 ’65","Honda S660 ’15","Honda S800 ’66","Honda S2000 ’99","Honda Sports Vision Gran Turismo","Hyundai Genesis Coupe 3.8 Track ’13","Hyundai Genesis","Infiniti CONCEPT Vision Gran Turismo","Italdesign EXENEO Vision Gran Turismo Off-road Mode","Italdesign EXENEO Vision Gran Turismo Street Mode","Jaguar D-type ’54","Jaguar E-type Coupé ’61","Jaguar F-type R Coupé ’14","Jaguar F-type","Jaguar Vision Gran Turismo Coupé","Jaguar Vision Gran Turismo Roadster","Jaguar Vision Gran Turismo SV","Jaguar XJ13 ’66","Jaguar XJ220 ’92","Jaguar XJR-9 ’88","Jeep Willys MB ’45","KTM X-BOW R ’12","Lambo V12 Vision Gran Turismo","Lamborghini Aventador LP700-4 ’11","Lamborghini Aventador LP 750-4 Superveloce ’15","Lamborghini Countach LP400 ’74","Lamborghini Countach 25th Anniversary ’88","Lamborghini Diablo GT ’00","Lamborghini Gallardo LP 560-4 ’08","Lamborghini Huracán LP 610-4 ’15","Lamborghini Huracán","Lamborghini Miura P400 Bertone Prototype ’67","Lamborghini Murciélago LP640 ’09","Lamborghini Urus ’18","Lamborghini Veneno ’14","Lancia Delta HF Integrale Evoluzione ’91","Lancia Stratos ’73","Lexus LC500 ’17","Lexus LF-LC GT Vision Gran Turismo","Lexus LFA ’10","Lexus RC F ’14","Lexus SC430 GT500 ’08","Maserati A6GCS/53 Spyder ’54","Maserati GranTurismo S ’08","Maserati MC20 ’20","Maserati Merak SS ’80","Mazda 3 X Burgundy Selection ’19","Mazda 787B ’91","Mazda Atenza","Mazda CX-30 X Smart Edition ’21","Mazda Demio XD Touring ’15","Mazda Eunos Roadster (NA Special Package) ’89","Mazda LM55 Vision Gran Turismo","Mazda Roadster S (ND) ’15","Mazda Roadster NR-A (ND) ’22","Mazda Roadster Touring Car","Mazda RX-7 GT-X (FC) ’90","Mazda RX-7 Spirit R Type A (FD) ’02","Mazda RX-8 Spirit R ’12","Mazda RX500 ’70","Mazda RX-Vision ’15","McLaren 650S Coupe ’14","McLaren 650S Gr.4","McLaren 650S GT3 ’15","McLaren F1 ’94","McLaren F1 GTR – BMW ’95","McLaren MP4-12C ’10","McLaren MP4/4 ’88","McLaren P1 GTR ’16","McLaren Ultimate Vision Gran Turismo","Mercedes-Benz 190 E 2.5-16 Evolution II ’91","Mercedes-Benz 300 SEL 6.8 AMG ’71","Mercedes-Benz 300 SL (W194) ’52","Mercedes-Benz 300 SL Coupé ’54","Mercedes-Benz A 45 AMG 4Matic ’13","Mercedes-Benz CLK-LM ’98","Mercedes-Benz S Barker Tourer ’29","Mercedes-Benz SLR McLaren ’09","Mercedes-Benz Unimog Type 411 ’62","Mercedes-Benz W 196 R ’55","MINI Clubman Vision Gran Turismo","Mini Cooper ’S’ ’65","Mitsubishi Concept XR-PHEV EVOLUTION Vision Gran Turismo","Mitsubishi GTO Twin Turbo ’91","Mitsubishi Lancer Evolution III GSR ’95","Mitsubishi Lancer Evolution IV GSR ’96","Mitsubishi Lancer Evolution V GSR ’98","Mitsubishi Lancer Evolution VI GSR T.M. EDITION Special Color Package ’99","Mitsubishi Lancer Evolution VIII MR GSR ’04","Mitsubishi Lancer Evolution IX MR GSR ’06","Mitsubishi Lancer Evolution Final Edition ’15","NISMO 400R ’95","Nissan 180SX Type X ’96","Nissan CONCEPT 2020 Vision Gran Turismo","Nissan Fairlady Z 432 ’69","Nissan Fairlady 240ZG (HS30) ’71","Nissan Fairlady Z 300ZX TwinTurbo ’89","Nissan Fairlady Z Version S (Z33) ’07","Nissan Fairlady Z (Z34) ’08","Nissan GT-R ’17","Nissan GT-R NISMO ’17","Nissan GT-R Premium edition T-spec ’24","Nissan GT-R Safety Car","Nissan R92CP ’92","Pagani Huayra ’13","Pagani Zonda R ’09","Peugeot 205 GTI ’88","Peugeot 205 Turbo 16 Evolution 2 ’86","Peugeot 208 GTi by Peugeot Sport ’14","Peugeot 908 HDi FAP ’10","Peugeot L500R HYbrid Vision Gran Turismo","Plymouth Superbird ’70","Plymouth XNR Ghia Roadster ’60","Pontiac Firebird Trans Am ’78","Pontiac GTO “The Judge” ’69","Porsche 356 A/1500 GS Carrera Speedster ’56","Porsche 356 A/1500 GS Carrera ’56","Porsche 911 Carrera RS (901) ’73","Porsche 911 Carrera RS (964) ’92","Porsche 911 Carrera RS (993) ’95","Porsche 911 Carrera RS Club Sport (993) ’95","Porsche 911 GT1 Strassenversion ’97","Porsche 911 GT3 (996) ’01","Porsche 911 GT3 (997) ’09","Porsche 911 GT3 RS (991) ’16","Porsche 911 GT3 RS (992) ’22","Porsche 911 RSR (991) ’17","Porsche 918 Spyder ’13","Porsche 919 Hybrid ’16","Porsche 959 ’87","Porsche 962 C ’88","Porsche Carrera GT ’04","Porsche Carrera GTS (904) ’64","Porsche Cayman GT4 ’16","Porsche Cayman GT4 Clubsport ’16","Radical SR3 SL ’13","RE Amemiya FD3S RX-7","Renault Sport Clio V6 24V ’00","Renault Sport Clio R.S. 220 EDC Trophy ’15","Renault Sport Clio R.S. 220 EDC Trophy ’16","Renault Kangoo 1.4 ’01","Renault Sport Mégane R.S. Trophy ’11","Renault Sport Mégane R.S. Trophy Safety Car","Renault Sport Mégane Trophy ’11","Renault R4 GTL ’85","Renault R5 Turbo ’80","Renault R8 Gordini ’66","Renault Sport R.S.01 ’16","Roadster Shop Rampage","RUF CTR3 ’07","RUF RGT 4.2 ’16","Shelby Cobra 427 ’66","Shelby Cobra Daytona Coupe ’64","Shelby GT350 ’65","Škoda Vision Gran Turismo","Subaru BRZ Drift Car ’17","Subaru BRZ S ’15","Subaru BRZ S ’21","Subaru BRZ STI Sport ’18",
                                       "Subaru BRZ GT300 ’21","Subaru Impreza 22B-STi ’98","Subaru Impreza Coupe WRX typeR STi VI ’99","Subaru Impreza Sedan WRX STi ’04","Subaru Impreza Rally Car ’98","Subaru VIZIV GT Vision Gran Turismo","Subaru WRX Gr.B Road Car","Subaru WRX Gr.B Rally Car","Subaru WRX Gr.4","Subaru WRX Gr.3","Super Formula Dallara SF19 / Honda ’19","Super Formula Dallara SF19 / Toyota ’19","Super Formula Dallara SF23 / Honda ’23","Suzuki Cappuccino (EA11R) ’91","Suzuki Carry KC ’12","Suzuki Jimny XC ’18","Suzuki Jimny Sierra JC ’18","Suzuki Swift Sport ’07","Suzuki Swift Sport ’17","Suzuki Vision Gran Turismo","Tesla Model 3 Performance ’23","Tesla Model S Signature Performance ’12","Toyota 86 GT ’15","Toyota 86 GT “Limited” ’16","Toyota 86 GRMN ’16","Toyota GR86 RZ ’21","Toyota 2000GT ’67","Toyota Alphard Executive Lounge ’18","Toyota Ambulance Himedic ’21","Toyota Aqua S ’11","Toyota C-HR S ’18","Toyota Celica GT-FOUR (ST205) ’94","Toyota Celica GT-FOUR Rally Car ’95","Toyota Corolla Levin 1600GT APEX (AE86) ’83","Toyota Crown Athlete G ’13","Toyota FT-1","Toyota GR010 HYBRID ’21","Toyota GR Corolla MORIZO Edition ’22","Toyota GR Supra RZ ’19","Toyota GR Supra Racing Concept ’18","Toyota GR Supra Race Car ’19","Toyota GR Yaris RZ “High Performance” ’20","Toyota GT-One (TS020) ’99","Toyota Hiace Van DX ’16","Toyota MR2 GT-S ’97","Toyota Prius G ’09","Toyota S-FR ’15","Toyota Sports 800 ’65","Toyota Sprinter Trueno 1600GT APEX (AE86) ’83","Toyota Supra 3.0GT Turbo A ’88","Toyota Supra RZ ’97","Toyota TS030 Hybrid ’12","Toyota TS050 – Hybrid ’16","Toyota Tundra TRD Pro ’19","TVR Tuscan Speed 6 ’00","Volkswagen 1200 ’66","Volkswagen Beetle","Volkswagen Golf I GTI ’83","Volkswagen Golf VII GTI ’14","Volkswagen GTI Roadster Vision Gran Turismo","Volkswagen GTI Supersport Vision Gran Turismo","Volkswagen ID. R ’19","Volkswagen Polo GTI ’14","Volkswagen Sambabus Typ 2 ’62","Volkswagen Scirocco R ’10","Volkswagen Scirocco","Volvo 240 SE Estate ’93","Volvo V40 T5 R-Design ’13","Wicked Fabrication GT 51","Zagato IsoRivolta Vision Gran Turismo"
], 
      
      tracks: ["24 Heures du Mans Racing Circuit – Full Course","24 Heures du Mans Racing Circuit – No Chicane","Alsace – Village","Alsace – Test Course","Autodrome Lago Maggiore – Full Course","Autodrome Lago Maggiore – Centre","Autodrome Lago Maggiore – East","Autodrome Lago Maggiore – East End","Autodrome Lago Maggiore – West","Autodrome Lago Maggiore – West End","Autódromo de Interlagos – Full Course","Autodromo Nazionale Monza – Full Course","Autodromo Nazionale Monza – No Chicane","Autopolis International Racing Course – Full Course","Autopolis International Racing Course – Shortcut Course","Blue Moon Bay Speedway – Full Course","Blue Moon Bay Speedway – Infield A","Blue Moon Bay Speedway – Infield B","Brands Hatch – Grand Prix Circuit","Brands Hatch – Indy Circuit","Broad Bean Raceway – Full Course","Circuit de Barcelona-Catalunya – Grand Prix Layout","Circuit de Barcelona-Catalunya – Grand Prix Layout No Chicane","Circuit de Barcelona-Catalunya – National Layout","Circuit de Barcelona-Catalunya – Rallycross Layout","Circuit de Sainte-Croix – Layout A","Circuit de Sainte-Croix – Layout B","Circuit de Sainte-Croix – Layout C","Circuit de Spa-Francorchamps – Full Course","Circuit de Spa-Francorchamps – 24h Layout","Colorado Springs – Lake","Daytona International Speedway – Tri-Oval","Daytona International Speedway – Road Course","Deep Forest Raceway – Full Course","Dragon Trail – Gardens","Dragon Trail – Seaside","Eiger Nordwand – Full Course","Fishermans Ranch – Full Course","Fuji International Speedway – Full Course","Fuji International Speedway – Short Course","Goodwood Motor Circuit – Full Course","Grand Valley – Highway 1","Grand Valley – South","High Speed Ring – Full Course","Kyoto Driving Park – Miyabi","Kyoto Driving Park – Yamagiwa","Kyoto Driving Park – Yamagiwa + Miyabi","Lake Louise – Tri-Oval","Lake Louise – Short Track","Lake Louise – Long Track","Michelin Raceway Road Atlanta – Full Course","Mount Panorama Circuit – Full Course","Northern Isle Speedway – Full Course","Nürburgring – 24h","Nürburgring – Endurance","Nürburgring – Grand Prix","Nürburgring – Nordschleife","Nürburgring – Nordschleife Tourist","Nürburgring – Sprint","Red Bull Ring – Full Course","Red Bull Ring – Short Track","Sardegna – Road Track Layout A","Sardegna – Road Track Layout B","Sardegna – Road Track Layout C","Sardegna – Windmills (Full Course)","Special Stage Route X – Full Course","Suzuka Circuit – Full Course","Suzuka Circuit – East Course","Tokyo Expressway – Central Clockwise","Tokyo Expressway – Central Counterclockwise","Tokyo Expressway – East Clockwise","Tokyo Expressway – East Counterclockwise","Tokyo Expressway – South Clockwise","Tokyo Expressway – South Counterclockwise","Trial Mountain Circuit – Full Course","Tsukuba Circuit – Full Course","Watkins Glen International – Long Course","Watkins Glen International – Short Course","WeatherTech Raceway Laguna Seca – Full Course","Willow Springs International Raceway – Big Willow","Willow Springs International Raceway – Horse Thief Mile","Willow Springs International Raceway – Streets of Willow Springs"
] },

  { name: "Nascar Heat 5", vehicles: ["Cup Series","Xfinity Series","Truck Series","Xtreme Dirt Tour"
], 
    tracks: ["Atlanta Motor Speedway","Auto Club Speedway","Bristol Motor Speedway","Bristol Motor Speedway (Dirt)","Canadian Tire Motorsports Park","Charlotte Motor Speedway","Charlotte Motor Speedway ROVAL","Chicagoland Speedway","Darlington Raceway","Daytona International Speedway","Dover International Speedway","Drebin Motor Speedway (Dirt)","Eldora Speedway","Fanatec Fairgrounds (Dirt)","Homestead-Miami Speedway","Indianapolis Motor Speedway","Indianapolis Motor Speedway ROVAL","Iowa Speedway","Jefferson Raceway (Dirt)","Kansas Speedway","Kentucky Speedway","Las Vegas Motor Speedway","Martinsville Speedway","Mid-Ohio Sports Car Course","Michigan International Speedway","New Hampshire Motor Speedway","Phoenix Raceway","Pocono Raceway","Richmond Raceway","Richmond Raceway (Dirt)","Road America","Sonoma Raceway","Talladega Superspeedway","The Dirt Track at Charlotte","The Dirt Track at Las Vegas","Texas Motor Speedway","Texas Motor Speedway Dirt Track","Watkins Glen International","World Wide Technology Raceway at Gateway"
] },

  { name: "Nascar 25 (COMING SOON)", vehicles: ["Cup Series","Xfinity Series","Truck Series","ARCA Menards Series"
], 
    tracks: ["Atlanta Motor Speedway","Autódromo Hermanos Rodriguez","Bowman Gray Stadium","Bristol Motor Speedway","Charlotte Motor Speedway","Charlotte Motor Speedway Roval","Chicago Street Race","Circuit of The Americas","Darlington Raceway","Daytona International Speedway","Dover Motor Speedway","Homestead-Miami Speedway","Indianapolis (Brickyard) Motor Speedway","Iowa Speedway","Kansas Speedway","Las Vegas Motor Speedway","Lime Rock Park","Lucas Oil Indianapolis Raceway Park","Martinsville Speedway","Michigan International Speedway","Michelin Raceway Road Atlanta","Nashville Superspeedway","New Hampshire Motor Speedway","North Wilkesboro Speedway","Phoenix Raceway","Pocono Raceway","Portland International Raceway","Richmond Raceway","Rockingham Speedway","Sebring Raceway","Sonoma Raceway","Talladega Superspeedway","Texas Motor Speedway","The Milwaukee Mile","Watkins Glen International","World Wide Technology Raceway"
] },

  { name: "F1 24'", vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"], 
    
    tracks: ["Albert Park, Melbourne (Australia)","Algarve International Circuit, Portimão (Portugal)","Autódromo Hermanos Rodríguez, Mexico City (Mexico)","Autódromo José Carlos Pace, Interlagos (Brazil)","Baku City Circuit (Azerbaijan)","Bahrain International Circuit (Bahrain)","Circuit de Barcelona-Catalunya (Spain)","Circuit de Spa-Francorchamps (Belgium) – Remade","Circuit Gilles Villenueve, Montreal (Canada)","Circuit of the Americas (Texas, USA)","Circuit Zandvoort (The Netherlands)","Hungaroring (Hungary)","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy)","Jeddah Corniche Circuit (Saudi Arabia) – Updated","Las Vegas Strip Street Circuit (USA)","Lusail International Circuit (Qatar) – Updated","Miami International Autodrome (USA)","Monte Carlo Grand Prix Circuit (Monaco)","Monza (Italy)","Red Bull Ring (Austria)","Shanghai International Circuit (China)","Silverstone (Great Britain) – Remade","Singapore Marina Bay (Singapore)","Suzuka (Japan)","Yas Marina Circuit (Abu Dhabi)"
] },

  { name: "F1 25'", vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"], 
    
    tracks: ["Albert Park, Melbourne (Australia) – Laser-scanned","Autódromo Hermanos Rodríguez, Mexico City (Mexico)","Autódromo José Carlos Pace, Interlagos (Brazil)","Bahrain International Circuit (Bahrain) – Laser-scanned","Baku City Circuit (Azerbaijan)","Circuit de Barcelona-Catalunya (Spain)","Circuit de Spa-Francorchamps (Belgium)","Circuit Gilles Villenueve, Montreal (Canada)","Circuit of the Americas (Texas, USA)","Circuit Zandvoort (The Netherlands)","Circuit Zandvoort (The Netherlands) – Reverse","Hungaroring (Hungary)","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Laser-scanned","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Reverse","Jeddah Corniche Circuit (Saudi Arabia)","Las Vegas Strip Street Circuit (USA)","Lusail International Circuit (Qatar)","Miami International Autodrome (USA) – Laser-scanned","Monte Carlo Grand Prix Circuit (Monaco)","Monza (Italy)","Red Bull Ring (Austria)","Red Bull Ring (Austria) – Reverse","Shanghai International Circuit (China)","Silverstone (Great Britain)","Silverstone (Great Britain) – Reverse","Singapore Marina Bay (Singapore)","Suzuka (Japan) – Laser-scanned","Yas Marina Circuit (Abu Dhabi)"
] },

  { name: "iRacing (COMING SOON)", vehicles: ["ARCA Chevrolet SS","ARCA Ford Mustang","ARCA Toyota Camry","Acura ARX-06 GTP","Acura NSX GT3 EVO 22","Aston Martin DBR9 GT1","Aston Martin Vantage GT4","Audi 90 GTO","Audi R18","Audi R8 LMS EVO II GT3","Audi RS 3 LMS TCR","BMW M Hybrid V8","BMW M4 F82 GT4 - 2018","BMW M4 G82 GT4","BMW M4 GT3","BMW M8 GTE","Cadillac V-Series.R GTP","Chevrolet Corvette C6.R GT1","Chevrolet Corvette C7 Daytona Prototype","Chevrolet Corvette C8.R GTE","Chevrolet Corvette Z06 GT3.R","Dallara F3","Dallara iR-01","Dallara IR18","Dallara P217","Dirt Big Block / 358 Modified","Dirt Late Model","Dirt Midget","Dirt Sprint Car","Dirt Sprint Car - Non-Winged","Ferrari 296 GT3","Ferrari 488 GT3 Evo 2020","Ferrari 488 GTE","Ferrari 499P","FIA F4","Ford Fiesta RS WRC","Ford GT GT2/GT3","Ford GTE","Ford Mustang FR500S","Ford Mustang GT3","Formula Renault 2.0","Formula Renault 3.5","Honda Civic Type R TCR","HPD ARX-01c","Hyundai Elantra N TCR","Hyundai Veloster N TCR","Indy Pro 2000 PM-18","Lamborghini Huracán GT3 EVO","Late Model Stock","Ligier JS P320","Lotus 49","Lotus 79","Lucas Oil Off Road Pro Trucks","McLaren 570S GT4","McLaren 720S GT3 EVO","McLaren MP4-30","Mercedes-AMG GT3 2020","Mercedes-AMG GT4","Mercedes-AMG W12 E Performance","Mercedes-AMG W13 E Performance","NASCAR Cup Series Chevrolet Camaro ZL1","NASCAR Cup Series Ford Mustang","NASCAR Cup Series Next Gen Chevrolet Camaro ZL1","NASCAR Cup Series Next Gen Ford Mustang","NASCAR Cup Series Next Gen Toyota Camry","NASCAR Cup Series Toyota Camry","NASCAR Legends Buick LeSabre - 1987","NASCAR Legends Chevrolet Monte Carlo - 1987","NASCAR Legends Ford Thunderbird - 1987","NASCAR Legends Pontiac Grand Prix - 1987","NASCAR Truck Chevrolet Silverado","NASCAR Truck Ford F150","NASCAR Truck Toyota Tundra TRD Pro","NASCAR Whelen Tour/SK Modified","NASCAR XFINITY Chevrolet Camaro","NASCAR XFINITY Ford Mustang","NASCAR XFINITY Toyota Supra","Nissan GTP ZX-T","Porsche 718 Cayman GT4 Clubsport MR","Porsche 911 GT3 Cup (992)","Porsche 911 GT3 R (992)","Porsche 911 RSR","Porsche 919","Porsche 963 GTP","Porsche Mission R","Radical SR10","Renault Clio","Ruf RT 12R","Silver Crown","Skip Barber Formula 2000","Sprint Car","SRX","Stock Car Brasil Chevrolet Cruze","Stock Car Brasil Toyota Corolla","Street Stock - Casino and Eagle","Subaru WRX STI","Super Formula Lights","Super Formula SF23","Super Late Model","Supercars Chevrolet Camaro Gen 3","Supercars Ford Mustang Gen 3","USF 2000","Williams FW31","[Legacy] ARCA Menards Chevy/Gen 4 Cup","[Legacy] Audi R8 LMS","[Legacy] BMW Z4 GT3","[Legacy] Dallara IR-05","[Legacy] Ferrari 488 GT3","[Legacy] McLaren MP4-12C GT3","[Legacy] Mercedes-AMG GT3","[Legacy] NASCAR Cup Chevrolet Impala COT - 2009","[Legacy] NASCAR Cup Chevrolet SS - 2013","[Legacy] NASCAR Cup Ford Fusion - 2016","[Legacy] NASCAR Nationwide Chevrolet Impala - 2012","[Legacy] NASCAR Xfinity Chevrolet Camaro - 2014","[Legacy] NASCAR Xfinity Ford Mustang - 2016","[Legacy] NASCAR Xfinity Toyota Camry - 2015","[Legacy] Porsche 911 GT3 Cup (991)","[Legacy] Porsche 911 GT3 R","[Legacy] Pro Mazda","[Legacy] Riley MkXX Daytona Prototype - 2008","[Legacy] Supercars Ford Mustang GT","[Legacy] Supercars Holden ZB Commodore","[Legacy] V8 Supercar Ford Falcon - 2009","[Legacy] V8 Supercar Ford FG Falcon - 2014","[Legacy] V8 Supercar Holden VF Commodore - 2014"
], 
    tracks: ["(COMING SOON)","Daytona International Speedway","Charlotte Motor Speedway","Sebring International Raceway","Lime Rock Park","Road Atlanta","Circuit of the Americas","Nürburgring GP","Nürburgring Nordschleife","Spa-Francorchamps","Suzuka Circuit","Monza","Silverstone Circuit","Watkins Glen","Mount Panorama Circuit","Indianapolis Motor Speedway"
] },

  { name: "WreckFest", vehicles: ["1971 AMC Javelin","RebelRat","Ariens S-16","1975 Ariens S-16","Lawn Mower","Austin Mini Cooper","1965 Austin Mini Cooper","Speedie","BMW M635 CSi","1983 BMW M635 CSi","Hornet","Buckshot Racing X2 RL","Sandstorm","Buick Regal","1982 Buick Regal","Raven","Cadillac Fleetwood Limousine","1980 Cadillac Fleetwood Limousine","Limo","Cadillac Sedan DeVille","1959 Cadillac Sedan DeVille","Wingman","Chevrolet Bel Air","1957 Chevrolet Bel Air","Hotbomb","Chevrolet Bel Air","1957 Chevrolet Bel Air","Hotshot","Chevrolet Blazer","1978 Chevrolet Blazer","MudDigger","Chevrolet Blazer","1978 Chevrolet Blazer","WarDigger","Chevrolet C-10","1982 Chevrolet C-10","Little Thrasher","Chevrolet Caprice","1986 Chevrolet Caprice","Rammer","Chevrolet Caprice","1986 Chevrolet Caprice","Rammer RS","Chevrolet Chevelle","1967 Chevrolet Chevelle","Roadcutter","Chevrolet Chevy Van","1980 Chevrolet Chevy Van","Motorhome","Chevrolet Corvette","1971 Chevrolet Corvette","Venom","Chevrolet Corvette","1973 Chevrolet Corvette","Super Venom","Chevrolet Corvette","2014 Chevrolet Corvette","Eagle R","Chevrolet El Camino","1976 Chevrolet El Camino","El Matador","Chevrolet Monte Carlo","1974 Chevrolet Monte Carlo","Gatecrasher","Chevrolet Step Van","1968 Chevrolet Step Van","Step Van","Double Decker","Sofa Car","Daimler DS420","1968 Daimler DS420","Hearse","Dodge Challenger","1971 Dodge Challenger","Bandit","Dodge Challenger","1971 Dodge Challenger","Bandit Ripper R2","Dodge Challenger","1971 Dodge Challenger","Bandit Ripper V8","Dodge Charger","1969 Dodge Charger","Bullet","Fiat 850","1964 Fiat 850","KillerBee","Fiat 850","1964 Fiat 850","KillerBee S","Fiat 850","1964 Fiat 850","KillerPig","Ford Escort","1970 Ford Escort","Boomer","Ford Escort","1970 Ford Escort","Boomer RS","Ford Granada","1972 Ford Granada","Sweeper","Ford LTD Wagon","1979 Ford LTD Wagon","Warwagon","Ford Model 18","1932 Ford Model 18","Outlaw","Ford Mustang","1968 Ford Mustang","Rocket","Ford Mustang Mach 1","1971 Ford Mustang Mach 1","WildKing","Ford Taunus","1970 Ford Taunus","Gremlin","GMC Vandura","1983 GMC Vandura","Vandal","Honda CR-X","1988 Honda CR-X","Nexus RX","Hoonigan Hoonicorn RTR","2014 Hoonigan Hoonicorn RTR","Rocket RX","Imperial Crown","1966 Imperial Crown","Grand Duke","International Harvester S-Series","Battle Bus","Jaguar XJ-S","1975 Jaguar XJ-S","Hunter Panther","Jaguar XJ-S","1975 Jaguar XJ-S","Panther RS","Jeep Wrangler","1987 Jeep Wrangler","Trooper","Lusse Auto Skooter","1953 Lusse Auto Skooter","Bumper Car","Honey Pot","Massey Ferguson 500","1965 Massey Ferguson 500","Harvester","Massey Ferguson 500","1965 Massey Ferguson 500","Hellvester","Mercury Grand Marquis","1998 Mercury Grand Marquis","Cardinal","Nissan Fairlady Z","1971 Nissan Fairlady Z","Sunrise Super","Nissan Skyline","1971 Nissan Skyline","Tristar","1993 Nissan Skyline Coupé","Razor","Oldsmobile Cutlass","1970 Oldsmobile Cutlass","Starbeast","Opel Manta 400","1984 Opel Manta 400","Stellar","Peterbilt 289","Big Rig","Peterbilt 289","Doom Rig","Pontiac Firebird","1968 Pontiac Firebird","Speedbird","Pontiac Firebird","1968 Pontiac Firebird","Speedbird GT","Pontiac Firebird","1973 Pontiac Firebird","DragSlayer","Pontiac Firebird","1973 Pontiac Firebird","RoadSlayer","Pontiac Firebird","1982 Pontiac Firebird","Blade","Pontiac Firebird Trans Am","1973 Pontiac Firebird Trans Am","RoadSlayer GT","Race Car BriSCA Formula 1 Stock Car","Reliant Regal Supervan III","1972 Reliant Regal Supervan III","Supervan","Rover 3.5-Litre","1967 Rover 3.5-Litre","Dominator","SAAB 96","1969 SAAB 96","Firefly","Toyota 222D","1985 Toyota 222D","Raiden RS","Toyota Hilux","1983 Toyota Hilux","Trophy Hunter","Toyota Supra","1986 Toyota Supra","PocketRocket","Toyota Supra","1986 Toyota Supra","Speedemon","VAZ 2105 Zhiguli","1979 VAZ 2105 Zhiguli","Gorbie","Volkswagen","1968 Volkswagen","Buggy","Volkswagen Beetle Baja Bug","1968 Volkswagen Beetle Baja Bug","BugZilla","Volvo 240 Estate","1975 Volvo 240 Estate","Hammerhead","Volvo 240 Estate","1980 Volvo 240 Estate","Hammerhead RS","Volvo PV 544","1962 Volvo PV 544","Bulldog","Audi A5","2007 Audi A5","Audi Q7","2006 Audi Q7","Caterpillar 385 BL","Caterpillar 980 G","Caterpillar unknown","Chevrolet Avalanche","2007 Chevrolet Avalanche","Fiat Ducato","2007 Fiat Ducato","Ford Club Wagon","1992 Ford Club Wagon","Ford Econoline","1992 Ford Econoline","Ford Econoline","1992 Ford Econoline","Ford F-150","1997 Ford F-150","Ford F-250","Forest River Berkshire","Freightliner Classic XL","Goodyear GZ-20","Isuzu NPR","2006 Isuzu NPR","JLG 600 AJ","Land-Rover Range Rover Sport","2010 Land-Rover Range Rover Sport","Lincoln Town Car","The Eagle","MAN LE","MAN Lion's Coach","Mazda 6","2005 Mazda 6","Mercedes-Benz Sprinter","2008 Mercedes-Benz Sprinter","Mercedes-Benz Sprinter","2008 Mercedes-Benz Sprinter","Oldsmobile Super 88","1956 Oldsmobile Super 88","Opel Astra","2007 Opel Astra","RAM 1500 Rebel","2016 RAM 1500 Rebel","Renault Clio","2005 Renault Clio","Scania P 94 280","Scania R 730","2010 Scania R 730","Tiffin Allegro","2009 Tiffin Allegro","Volvo B10 M Wiima 302"
], 
    tracks: ["Bonebreaker Valley","Crash Canyon","Dirt Devil Stadium","Hillstreet Circuit","Madman Stadium","Motorcity Circuit","Rattlesnake Racepark","Sandstone Raceway","Savage Speedway","Tarmac 1","Tarmac 2"
] },

  { name: "WreckFest 2", vehicles: ["Roadslayer","Rocket","Striker","Ginger"], 
    tracks: ["Junkyard Jam","Thunder Alley","Demolition Dome","Scrapyard Sprint","Ironclad Circuit","Chaos Crossing","Blitz Bowl"
] },

  { name: "LeMans Ultimate (COMING SOON)", vehicles: ["Aston Martin Vantage AMR LMGT3","BMW M4 LMGT3","Corvette Z06 LMGT3","Ferrari 296 LMGT3","Ford Mustang LMGT3","McLaren 720S LMGT3 Evo","Porsche 911 GT3 R","GTE","LMGT3","Aston Martin Valkyrie","BMW M Hybrid V8","Chevrolet Corvette (C8)","Toyota GR010 Hybrid","Lamborghini SC63"
], tracks: ["(COMING SOON)","Circuit de la Sarthe","Sebring International Raceway","Spa-Francorchamps","Monza","Fuji Speedway","Portimão","Bahrain International Circuit"
] },

  { name: "Kart Racing|PRO (COMING SOON!!)", vehicles: ["Lightning Kart","Shadow Kart","Dragon Kart"], 
    tracks: ["(COMING SOON)","Turbo Park","Desert Drift","Frosty Freeway","Jungle Jam","Mountain Mayhem","Skyline Circuit","Volcano Valley"
] },

  { name: "Dirt Rally 2.0 (COMING SOON)", vehicles: ["Alpine Renault A110 1600 S","Fiat 131 Abarth Rally","Ford Escort Mk II","Opel Kadett C GTE","Aston Martin V8 Vantage GT4","BMW M2 Competition","Chevrolet Camaro GT4R","Ford Mustang GT4","Porsche 911 RGT Rally spec","Audi S1 EKS RX Quattro","Ford Fiesta Rallycross MK7","Ford Fiesta Rallycross MK8","Peugeot 208 WRX","Renault Sport Megane RS RX","Subaru WRX STI Rallycross","Volkswagen Polo R Supercar","Audi S1 EKS RX Quattro","Ford Fiesta Rallycross MK8","Ford Fiesta Rallycross STARD","Ford Fiesta RXS EVO 5","Mini Cooper SX1","Peugeot 208 WRX","Renault Sport Clio RS RX","Renault Sport Megane RS RX","Seat Ibiza RX","Audi Sport quattro S1 E2","Ford RS200","Lancia Delta S4","MG Metro 6R4","Peugeot 205 T16 Evo 2","BMW E30 M3 Evo Rally","Datsun 240Z","Ford Sierra Cosworth RS500","Lancia Stratos","Opel Ascona 400","Renault 5 Turbo","BMW M1 Procar Rally","Lancia 037 EVO 2","Opel Manta 400","Porsche 911 SC RS","Citroen C3 R5","Ford Fiesta R5","Ford Fiesta R5 MKII","Mitsubishi Space Star R5","Peugeot 208 T16 R5","SKODA Fabia R5","Volkswagen Polo GTI R5","Citroen C4 Rally","Ford Focus RS Rally 2001","Ford Focus RS Rally 2007","Peugeot 206 Rally","Skoda Fabia Rally","Subaru Impreza","Subaru Impreza 2001","Subaru Impreza S4 Rally","DS Automobiles DS 21","Lancia Fulvia HF","Mini Cooper S","Ford Escort RS Cosworth","Lancia Delta HF Integrale","Mitsubishi Lancer Evolution VI","Subaru Impreza 1995","Subaru Legacy RS","Ford Fiesta Omse Supercar Lites","Ford Fiesta R2","Opel Adam R2","Peugeot 208 R2","Lancia Delta S4 Rallycross","Metro 6R4 Rallycross","Peugeot 205 T16 Rallycross","RS200 Evolution","Mitsubishi Lancer Evolution X","Subaru WRX STI NR4","Opel Corsa Super 1600","Renault Sport Clio RS S1600","Volkswagen Polo S1600","Peugeot 205 GTI","Volkswagen Golf GTI 16V","Peugeot 306 MAXI","Seat Ibiza Kit Car","Volkswagen Golf Kitcar","Speedcar Xtrem"
], 
    tracks: ["(COMING SOON)","Argentina - Valle de los Puentes","Argentina - El Rodeo","Australia - Noorinbee Ridge","Australia - Mount Kaye Pass","New Zealand - Waimarama Point","New Zealand - Ocean Beach Sprint","Spain - Centenera","Spain - Ascenso bosque Montverd","USA - North Fork Pass","USA - Hancock Hill Sprint","Poland - Czarny Las","Poland - Marynka"
] }
];


// ------------------ PRODUCT DEFINITIONS ------------------
const bundleTiers = [
  { id: "bundle1", name: "1 Car / 1 Track", type: "bundle", base: 22.99, code: "TANSDAANZ7H5L", features: ["Car tuning package", "Performance boost", "Optimized setups"] },
  { id: "bundle2", name: "1 Car / 2 Tracks or 2 Cars / 1 Track", type: "bundle", base: 25.99, code: "HZAK8CZM94384", features: ["Advanced handling tweaks", "Racing optimization"] },
  { id: "bundle3", name: "1 Car / 3 Tracks or 3 Cars / 1 Track", type: "bundle", base: 32.99, code: "V55FRB25GM4QN", features: ["Optimized car & track combo", "Tailored tune for events", "Fast delivery", "--1 FREE TUNE FOR 1 MORE CAR UPON PURCHASE--"] }
];

const tierTiers = [
  { id: "basic", name: "Basic", type: "flat", price: 5.99, code: "A67AS7RGPZLGE", features: ["Single car setup", "Performance adjustments", "Up to 3 Adjustments Per Car", "Tires", "Camber", "Springs", "Suspension", "Brakes"] },
  { id: "pro", name: "Pro", type: "flat", price: 9.99, code: "8PTZ739CJ4YDJ", features: ["All Basic features", "Gearing, suspension, tires & aerodynamics", "Up to 6 Adjustments Per Car", "Tires", "Camber", "Anti-Roll Bars", "Aero", "Brakes", "Differentials"] },
  { id: "elite", name: "Elite", type: "flat", price: 16.99, code: "3U7FL6M5YZB6A", features: ["Full race-ready custom setup", "Peak performance tuning", "Up to 10 Adjustments Per Car", "Tires", "Camber", "Toe and Caster", "Springs", "Anti-Roll Bars", "Dampers", "Suspension Geometry", "Aero", "Brakes", "Differentials"] }
];

const coachingTier = {
  id: "coach",
  name: "Custom Coaching",
  type: "coach",
  price: 59.99,
  code: "EEFRHEEQ8A4SA",
  features: [
    "*Tell us what you need…*",
    "<span class='text-red'>(— Car & Build):</span><span class='text-ice'> Make, model, year, engine & drivetrain mods</span>",
    "<span class='text-red'>(— Tracklist):</span><span class='text-ice'> Which circuits or types of tracks you race most</span>",
    "<span class='text-red'>(— Driving Style):</span><span class='text-ice'> e.g. aggressive on entry, smooth exits, late braking</span>",
    "<span class='text-red'>(— Performance Goals):</span><span class='text-ice'> Lap-time targets, corner-speed, top-end power</span>",
    "<span class='text-red'>(— Areas to Improve):</span><span class='text-ice'> Understeer, throttle response, shifting, etc.</span>",
    "<span class='text-red'>(— Other Games/Platforms):</span><span class='text-ice'> If you race in other titles or on sim rigs.</span>",
    "*Weekly-7 days coaching subscription* (NOT AUTO BILLED), so you don't have to worry about unexpected charges, it is all based to your needs!"
  ]
};

const WHY_FEATURES = [
  { icon: "🏎️", title: "Tailored to Your Driving", desc: "Tunes made for your car, your style, your game. Feel the difference on track instantly." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Receive your tune within 24 hours. Quick service, no waiting." },
  { icon: "💡", title: "Expert Knowledge", desc: "Each tune is developed and tested by a veteran team of racers." },
  { icon: "🎮", title: "Cross-Platform", desc: "Works for Xbox, PlayStation, PC – all supported games, all the best setups." }
];

const REVIEWS = [
  "“Immediately noticed better handling and corner control, they really take the time to understand your driving needs...” -SHxTLUCK",
  "“Top speed boost and smoother shifting, kept me in the top 3 at Daytona – brilliant adjustments!” -LowLeadAV",
  "“My car finally feels the way it's supposed to respond when turning, braking, and accelerating!!.” -Wintrlol",
  "“Lap consistency is way better now. Gaining anywhere from 2-5 seconds on my total lap times...” -FiveUp",
  "“Gave me the edge in my last time trial tournament in Grand Turismo...” -B1g3n3rgy#7033",
  "“Traction and throttle response improved massively...” -Retro302",
  "“Used the Elite Package for 3 tracks with the NASCAR Mustang in Forza and crushed leaderboards all week.” -Snoboi92",
  "“Gained a full tier in ranked races, finally back up to S Class!” -PartyRT",
  "“Feels pro-level now, perfect for sweaty races, League Races, or simply just having fun online.” -EZ the Megas",
  "“Super smooth ride, helps control power better, giving better response when coming into a turn.” -FTW RS99",
  "“Beat my rival by 3 seconds after installing the tune they gave me for Indianapolis Brickyard A Class.” -NoChillNate54",
  "“Didn’t think ACC could feel this responsive, with such minimal changes with the basic plan!!! Great Bang For the Buck!.” -NFSMWLEGEND",
  "“Every gear hits right, acceleration is flawless, pulls feel like I've got real G-forces on my sim rig.” -GPoe66",
  "“My drifting improved tenfold. Finally feels dialed in...” -FSCC FATAL",
  "“It’s like racing on rails – total stability upgrade.” -OG SOUR D 13"
];

// ----------------- CART STATE -----------------
let cart = [];

// ----------------- CART HELPERS -----------------
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.length;
}

function composeCartName(product, extra) {
  return [product.name, extra?.tier ? `+ ${extra.tier}` : '', extra?.game || '', extra?.vehicle || '', extra?.track || '']
    .filter(Boolean)
    .join(' / ');
}

function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const payBtn  = document.getElementById("paypal-button-container");

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = "<div>Your cart is empty.</div>";
    totalEl.textContent = "";
    payBtn.innerHTML = "";
    updateCartCount();
    return;
  }

  itemsEl.innerHTML = "";
  cart.forEach((item, i) => {
    itemsEl.insertAdjacentHTML(
      "beforeend",
      `<div class="cart-item">
         <b>${item.displayName}</b>
         <div><span style="color:red;">$${item.price.toFixed(2)}</span></div>
         <button class="remove-btn" onclick="removeCart(${i})">Remove</button>
       </div>`
    );
  });

  const total = cart.reduce((sum, x) => sum + x.price, 0).toFixed(2);
  totalEl.innerHTML = `<div class="cart-total">Total: <b>$${total}</b></div>`;
  renderPayPalButton();
  updateCartCount();
}

window.removeCart = function(i) {
  cart.splice(i, 1);
  renderCart();
  updateCartCount();
};

// ----------------- RENDER PRICING GRID -----------------
function renderPricing() {
  const grid = document.getElementById("pricing-tiers");
  if (!grid) return;
  grid.innerHTML = "";

  // Bundles (Packages 1-3)
  bundleTiers.forEach((bundle, i) => {
    const features = bundle.features.map(f => `<li style="color:var(--accent-ice);">${f}</li>`).join("");
    const tierOptions = tierTiers.map((t, idx) =>
      `<option value="${idx}">${t.name} (+$${t.price.toFixed(2)})</option>`
    ).join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${bundle.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${bundle.base.toFixed(2)}</div>
         <ul class="features-list">${features}</ul>
         <select id="bundle-game-${i}" onchange="onBundleGame(${i})">
           <option value="">Select Game</option>
           ${GAME_DATA.map(g => `<option>${g.name}</option>`).join("")}
         </select>
         <select id="bundle-vehicle-${i}" disabled><option>Select Vehicle</option></select>
         <select id="bundle-track-${i}" disabled><option>Select Track</option></select>
         <select id="bundle-tier-${i}" disabled>
           <option value="">Select Tier</option>
           ${tierOptions}
         </select>
         <textarea id="bundle-notes-${i}" maxlength="250" rows="2" placeholder="Add notes (max 250 chars)" style="width:100%;margin:10px 0 4px 0;padding:5px;font-size:14px;resize:none;"></textarea>
         <button id="btn-bundle-${i}" disabled onclick="addBundleTier(${i})">Add To Cart</button>
       </div>`
    );
  });

  // Flat tiers (Packages 4-6)
  tierTiers.forEach((tier, i) => {
    const idx = bundleTiers.length + i;
    const features = tier.features.map(f => `<li style="color:var(--accent-ice);">${f}</li>`).join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${tier.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${tier.price.toFixed(2)}</div>
         <ul class="features-list">${features}</ul>
         <select id="game-flat-${idx}" onchange="onGameFlat(${idx})">
           <option value="">Select Game</option>
           ${GAME_DATA.map(g => `<option>${g.name}</option>`).join("")}
         </select>
         <select id="car-flat-${idx}" disabled><option>Select Vehicle</option></select>
         <select id="track-flat-${idx}" disabled><option>Select Track</option></select>
         <textarea id="flat-notes-${idx}" maxlength="250" rows="2" placeholder="Add notes (max 250 chars)" style="width:100%;margin:10px 0 4px 0;padding:5px;font-size:14px;resize:none;"></textarea>
         <button id="btn-flat-${idx}" disabled onclick="addFlat(${idx})">Add To Cart</button>
       </div>`
    );
  });

  // Coaching
  const coachFeatures = coachingTier.features.map(f =>
    f.startsWith("*")
      ? `<li style="color:var(--accent-ice);font-style:italic;">${f}</li>`
      : `<li>${f}</li>`
  ).join("");

  grid.insertAdjacentHTML(
    "beforeend",
    `<div class="pricing-card coach-card" style="opacity:0;">
       <h3>${coachingTier.name}</h3>
       <div class="price-tag" style="color:var(--accent-ice);">$${coachingTier.price.toFixed(2)}</div>
       <ul class="features-list">${coachFeatures}</ul>
       <input type="text" id="name-coach" placeholder="Your Name/Gamertag" required>
       <input type="email" id="email-coach" placeholder="Your Email" required>
       <textarea id="detail-coach" placeholder="Describe your needs…" required></textarea>
       <button onclick="sendCoachingRequest()">Contact for Coaching</button>
     </div>`
  );

  animatePricingCards();
}

function animatePricingCards() {
  if (!window.gsap) return;
  gsap.utils.toArray(".pricing-card").forEach(card => {
    gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
    }).to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  });
}

// ------------- DROPDOWNS & ADD LOGIC --------------
window.onBundleGame = idx => {
  const gameSel    = document.getElementById(`bundle-game-${idx}`);
  const vehicleSel = document.getElementById(`bundle-vehicle-${idx}`);
  const trackSel   = document.getElementById(`bundle-track-${idx}`);
  const tierSel    = document.getElementById(`bundle-tier-${idx}`);
  const btn        = document.getElementById(`btn-bundle-${idx}`);

  vehicleSel.disabled = trackSel.disabled = tierSel.disabled = true;
  btn.disabled = true;
  vehicleSel.innerHTML = `<option>Select Vehicle</option>`;
  trackSel.innerHTML   = `<option>Select Track</option>`;

  const game = GAME_DATA.find(g => g.name === gameSel.value);
  if (!game) return;

  vehicleSel.innerHTML += game.vehicles.map(v => `<option>${v}</option>`).join("");
  trackSel.innerHTML   += game.tracks.map(t => `<option>${t}</option>`).join("");
  vehicleSel.disabled = false;

  vehicleSel.onchange = () => {
    trackSel.disabled = false;
    tierSel.disabled  = true;
    btn.disabled      = true;

    trackSel.onchange = () => {
      tierSel.disabled = false;
      btn.disabled     = true;

      tierSel.onchange = () => {
        btn.disabled = false;
      };
    };
  };
};

window.addBundleTier = idx => {
  const game    = document.getElementById(`bundle-game-${idx}`).value;
  const vehicle = document.getElementById(`bundle-vehicle-${idx}`).value;
  const track   = document.getElementById(`bundle-track-${idx}`).value;
  const tierIdx = document.getElementById(`bundle-tier-${idx}`).value;
  const notes   = document.getElementById(`bundle-notes-${idx}`).value.trim().slice(0, 250);
  if (!game || !vehicle || !track || tierIdx === "") {
    return alert("Please select game, vehicle, track & tier.");
  }

  const bundle = bundleTiers[idx];
  const tier   = tierTiers[parseInt(tierIdx, 10)];
  const price  = bundle.base + tier.price;
  cart.push({
    id:          bundle.id,
    code:        bundle.code,
    name:        bundle.name,
    tier:        tier.name,
    game,
    vehicle,
    track,
    price,
    notes,
    displayName: composeCartName(bundle, { tier: tier.name, game, vehicle, track })
  });
  renderCart();
};

window.onGameFlat = idx => {
  const gameSel  = document.getElementById(`game-flat-${idx}`);
  const carSel   = document.getElementById(`car-flat-${idx}`);
  const trackSel = document.getElementById(`track-flat-${idx}`);
  const btn      = document.getElementById(`btn-flat-${idx}`);

  carSel.disabled = trackSel.disabled = true;
  btn.disabled    = true;
  carSel.innerHTML   = `<option>Select Vehicle</option>`;
  trackSel.innerHTML = `<option>Select Track</option>`;

  const game = GAME_DATA.find(g => g.name === gameSel.value);
  if (!game) return;

  carSel.innerHTML   += game.vehicles.map(v => `<option>${v}</option>`).join("");
  trackSel.innerHTML += game.tracks.map(t => `<option>${t}</option>`).join("");
  carSel.disabled = false;

  carSel.onchange = () => {
    trackSel.disabled = false;
    btn.disabled      = true;
    trackSel.onchange = () => btn.disabled = false;
  };
};

window.addFlat = idx => {
  const game    = document.getElementById(`game-flat-${idx}`).value;
  const vehicle = document.getElementById(`car-flat-${idx}`).value;
  const track   = document.getElementById(`track-flat-${idx}`).value;
  const notes   = document.getElementById(`flat-notes-${idx}`).value.trim().slice(0, 250);
  const tierIdx = idx - bundleTiers.length;

  if (!game || !vehicle || !track) {
    return alert("Please select game, vehicle & track.");
  }
  const pkg   = tierTiers[tierIdx];
  const price = pkg.price;
  cart.push({
    id:          pkg.id,
    code:        pkg.code,
    name:        pkg.name,
    game,
    vehicle,
    track,
    price,
    notes,
    displayName: composeCartName(pkg, { game, vehicle, track })
  });
  renderCart();
};

window.sendCoachingRequest = () => {
  const name   = document.getElementById("name-coach").value.trim();
  const email  = document.getElementById("email-coach").value.trim();
  const detail = document.getElementById("detail-coach").value.trim();

  if (!name || !email || !detail) {
    return alert("Please complete all required fields for Custom Coaching.");
  }

  cart.push({
    id:          coachingTier.id,
    code:        coachingTier.code,
    name:        coachingTier.name,
    price:       coachingTier.price,
    displayName: `Coaching for ${name} (${email}): ${detail.substring(0, 40)}…`
  });
  renderCart();
};

// ----------- CART MODAL TOGGLE -----------
window.toggleCartModal = () => {
  const modal = document.getElementById("cart-modal-navbar");
  if (modal) {
    modal.classList.toggle("show");
    renderCart();
  }
};
document.getElementById("cart-icon-navbar")?.addEventListener("click", toggleCartModal);
document.getElementById("close-cart-modal-navbar")?.addEventListener("click", toggleCartModal);

// ----------- PAYPAL BUTTONS INTEGRATION -----------
function renderPayPalButton() {
  const btnContainer = document.getElementById("paypal-button-container");
  btnContainer.innerHTML = "";
  if (!window.paypal || cart.length === 0) return;

  window.paypal.Buttons({
    style: { shape: "rect", layout: "vertical", color: "gold", label: "paypal" },
    createOrder: (data, actions) => {
      const items = cart.map(item => ({
        name: item.displayName,
        sku: item.code,
        unit_amount: { currency_code: "USD", value: item.price.toFixed(2) },
        quantity: "1"
      }));
      const total = cart.reduce((sum, x) => sum + x.price, 0).toFixed(2);

      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: { item_total: { currency_code: "USD", value: total } }
          },
          items
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(details => {
        resultMessage(`✅ ${details.status}: ${details.id}`);
        cart = [];
        renderCart();
        toggleCartModal();
      });
    },
    onError: err => {
      resultMessage(`PayPal error: ${err}`);
    }
  }).render("#paypal-button-container");
}

function resultMessage(msg) {
  document.getElementById("result-message").innerHTML = msg;
}

// ----------- DOM CONTENT LOADED & UI SETUP -----------
document.addEventListener("DOMContentLoaded", () => {
  // Center section titles
  ["pricing", "reviews", "why-tune"].forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const title = section.querySelector(".section-title, .gold-center-title");
    if (title) title.classList.add("section-title-centered");
  });

  // Navbar scroll color change
  const nav = document.getElementById("navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) nav.classList.replace("transparent", "solid");
      else nav.classList.replace("solid", "transparent");
    });
  }

  // GSAP hero animations
  if (window.gsap) {
    gsap.from(".main-hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 0.8 });
    gsap.from(".hero-cta", { scale: 0.8, opacity: 0, delay: 0.6, duration: 0.6 });
    document.querySelectorAll(".fade-section").forEach(sec => {
      gsap.to(sec, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" }
      });
    });
  }

  // Render Why-Tune grid
  const whyGrid = document.getElementById("why-tune-features-grid");
  if (whyGrid) {
    whyGrid.innerHTML = WHY_FEATURES.map(f =>
      `<div class="why-feature-container">
         <div class="why-feature-icon">${f.icon}</div>
         <div class="why-feature-title">${f.title}</div>
         <div class="why-feature-desc" style="color:var(--accent-ice);">${f.desc}</div>
       </div>`
    ).join("");
  }

  // Review cycle
  let reviewIndex = 0;
  const box = document.getElementById("review-box");
  function showReview() {
    if (!box) return;
    box.style.opacity = 0;
    setTimeout(() => {
      box.textContent = REVIEWS[reviewIndex];
      box.style.opacity = 1;
      reviewIndex = (reviewIndex + 1) % REVIEWS.length;
    }, 400);
  }
  showReview();
  setInterval(showReview, 5000);

  // Render pricing & cart
  renderPricing();
  renderCart();
  updateCartCount();

  // Smooth scroll helper
  window.scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
});

