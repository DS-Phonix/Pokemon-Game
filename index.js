const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i +=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
 }



 const bundaries = []

 const offset = {
    x: -592,
    y: -925
}

 collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        bundaries.push(
            new Boundary({
                position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }
    })
    )
    })
 })
 

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const foregroundImage = new Image()
foregroundImage.src = './imgs/foregroundObjects.png'

const image = new Image()
image.src = './imgs/Pokemon Style Game Map v2.png'

const playerImage = new Image ()
playerImage.src = './imgs/playerDown.png'



const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


const movables = [background, ...bundaries, foreground]

function rectangularCollision ({ rectangel1, rectangle2 }) {
    return (
            rectangel1.position.x + rectangel1.width >= rectangle2.position.x && 
            rectangel1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangel1.position.y <= rectangle2.position.y + rectangle2.height &&
            rectangel1.position.y + rectangel1.height >= rectangle2.position.y
           )
}

function animated() {
    window.requestAnimationFrame(animated)
    background.draw()
    bundaries.forEach(boundary => {
        boundary.draw()
   })

  player.draw()
  foreground.draw()

   let moving = true
    player.moving = false
       if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        for (let i = 0; i < bundaries.length; i++){
          const boundary = bundaries[i]
            if (
                rectangularCollision({
                 rectangel1: player,
                 rectangle2: {...boundary, position: {
                 x: boundary.position.x,
                 y:boundary.position.y + 2
                  }}
                })
                )
                   {
                    console.log('colliding')
                    moving = false
                    break
                   }        
        }
        
        if (moving)
        movables.forEach(movable => {
            movable.position.y += 2
            })
            }
       else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        for (let i = 0; i < bundaries.length; i++){
            const boundary = bundaries[i]
            if (
                rectangularCollision({
                    rectangel1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 2,
                        y:boundary.position.y 
                    }}
                })
                )
               {
                console.log('colliding')
                moving = false
                break
               }        
        }
    
    if (moving)
        movables.forEach(movable => {
            movable.position.x += 2
            })}
       else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        for (let i = 0; i < bundaries.length; i++){
            const boundary = bundaries[i]
            if (
                rectangularCollision({
                    rectangel1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y:boundary.position.y - 2
                    }}
                })
                )
               {
                console.log('colliding')
                moving = false
                break
               }        
        }
    
    if (moving)
        movables.forEach(movable => {
            movable.position.y -= 2
            })}
       else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        for (let i = 0; i < bundaries.length; i++){
            const boundary = bundaries[i]
            if (
                rectangularCollision({
                    rectangel1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 2,
                        y:boundary.position.y
                    }}
                })
                )
               {
                console.log('colliding')
                moving = false
                break
               }        
        }
    
    if (moving)
        movables.forEach(movable => {
            movable.position.x -= 2
            })}

}
animated()

let lastKey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})