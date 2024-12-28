const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = 800;

let TILE_SIZE = 6;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


let  blue= 'rgb(72,139,194, 0.10)'
let  green= 'rgb(107,178,140, 0.10)'
let  red= 'rgb(217,33,32, 0.10)'

const colors = [red, green, blue]


const code = [
'',
'#include <stdio.h>',
'#include <stdlib.h>',
'#include <stdbool.h>',
'',
'struct Node{',
	'   int data;',
	'   struct Node* left;',
	'   struct Node* right;',
	'   struct Node* parent;',
'}Node;',
'',
'struct Node* createNode(int data, struct Node* parent){',
	'   struct Node* new_node = malloc(sizeof(Node));',
	'   new_node->data = data;',
	'   new_node->left = NULL;',
	'   new_node->right = NULL;',
	'   new_node->parent = parent;',
'',
	'   return new_node;',
'}',
'',
'void inserNode(struct Node** tree, int data, struct Node* parent){',
	'   if (*tree == NULL){',
		'      struct Node* new_node = createNode(data, parent);',
		'      *tree = new_node;',
	'   }',
	'   else{',
		'      int root_value = (*tree)->data;',
		'      if (data < root_value){',
			'         inserNode(&(*tree)->left, data, *tree);',
		'   }',
		'   else{',
			'   inserNode(&(*tree)->right, data, *tree);',
		'   }',
	'  }',
' }'
]


const logo = [
'┌──────────────────────────────────────────────────────────┐',
'│MMMMMMMMNmdhhhdmNMMMMMMM    NAME: Lu                      │',
'│MMMMdy+/////////+ymMMMMM    LAST NAME: Null               │',
'│MMd+////shdmdhs////omMMM                                  │',
'│Ns/////mMMMMMMMd/////yMM    DOB & PLACE OF BIRTH:         │',
'│s/////yMMMMMMMMMs/////hM    01-11-2190                    │',
'│//////yMMMMMMMMMs//////N    A.D. Galaxy Planet Σ σ ς      │',
'│//////+NMMMMMMMm///////d    cor 14.89756, 18.55648        │',
'│///////+mMMMMMd+///////m	                                 │',
'│///////+sMMMMMo///////+M    ISUED DATE:    EXPIRATION DATE│',
'│d///ohmNMMMMMMMNdyo//+mM    06-06-2220     10-12-2230     │',
'│MmsmMMMMMMMMMMMMMMMmsmMM	                                 │',
'│MMMMMMMMMMMMMMMMMMMMMMMM    Authority:     ID #:          │',
'│MMMMMMMMMMMMMMMMMMMMMMMM    Andromeda      |z99872369|    │',
'│                                                          │',
'│                                                          │',
'│                                                          │',
'│                                                          │',
'│/^([a-zA-z0-9_-.+]+)@([a-zA-z0-9_-.]+).([a-zA-Z]{2,5})$/  │',
'└──────────────────────────────────────────────────────────┘'
]

const fontSize = 26;
let rect_y = canvas.height

function animate() {
	// refresh canvas
	c.fillStyle = 'black'
	c.fillRect(0,0, canvas.width, canvas.height);
	
	// logo and code
	c.fillStyle = 'orange';
	c.font = fontSize + 'px monospace'; 
	for (var i = 0; i < code.length; i++) {
		c.fillText(code[i], 0, i*fontSize);	
	}
	for (var i = 0; i < logo.length; i++) {
		c.fillText(logo[i], 1000, i*fontSize);	
	}

	//static
	for (var i = 0; i < canvas.width / TILE_SIZE; i++){
		for (var j = 0; j < canvas.height / TILE_SIZE; j++) {	
			c.fillStyle = colors[getRandomInt(colors.length)]
			c.fillRect(i * TILE_SIZE,j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
			
		}
	}


	// vintage line 
	c.fillStyle = "rgb(255,255,255,255, 0.05)"
	c.fillRect(0, rect_y, canvas.width, 2)
	rect_y -= 12
	if (rect_y < -800) {
		rect_y = canvas.width
	}

}

setInterval(animate, 60);


