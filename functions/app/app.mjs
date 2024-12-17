// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default (request, context) => {
  try {
    const url = new URL(request.url)
    const subject = url.searchParams.get('name') || 'World'

    return new Response(`Hello ${subject}`)
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}

// router.get('/api/csv', (req, res) => {
//   const data = [];
//   fs.createReadStream('car_sales.csv')
//       .pipe(csvParser())
//       .on('data', (row) => {
//           data.push(row);
//         })
//         .on('end', () => {
//           res.json(data);
//         });
// });
