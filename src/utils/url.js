export default function getQueryString(name) {
	let a = window.location.href
	let b = []
	let c = []
	a = decodeURIComponent(a)
	a.split('?').map(item => {
		if (item.indexOf('=') > -1) {
			if (item.indexOf('#') > -1) {
				let aa = item.split('#')
				aa.map(e => {
					if (e.indexOf('=') > -1) {
						b.push(decodeURIComponent(e))
					}
				})
			} else {
				b.push(decodeURIComponent(item))
			}
		}
	})
	b.map(items => {
		if (items.indexOf('&') > -1) {
			let d = []
			d = items.split('&')
			c = c.concat(d)
		} else {
			c.push(items)
		}
	})
	let e = {}
	c.map(i => {
		e[i.split('=')[0]] = i.split('=')[1]
	})
	return e[name] || null
}
