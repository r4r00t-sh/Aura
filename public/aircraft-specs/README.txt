Aircraft specification PDFs for the "Aircraft for Sale" page.

How to add or update a listing PDF
----------------------------------
1. Name the file to match the listing `pdfUrl` in src/data/aircraftForSale.ts
   Example: dassault-falcon-2000lxs-2015.pdf
2. Place the PDF in this folder (public/aircraft-specs/).
3. Keep the data entry's `pdfUrl` as /aircraft-specs/<filename>.pdf

The Inquire button on each card opens that PDF in a new tab.

Placeholder note
----------------
Until you upload real sheets, the links return 404. Add your PDFs here with the
exact filenames referenced in aircraftForSale.ts.
