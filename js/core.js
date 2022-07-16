export default function html([first, ...strings], ...values) {
    return values.reduce((acc, cur) => 
        acc.concat(cur, strings.shift())
    ,[first])
    .filter(x => x && x!==true || x ===0
    //     function(x) {
    //     if (x && x!==true || x === 0) {
    //         return x
    //     }
    // }
    ).join('')  
}

export function createStore(reducer) { // Export 1 cái store chứa reducer ( đặt tên là state {1 biến trong reactJS} )
    let state = reducer()
    const roots = new Map() // Tạo biến roots là 1 object chứa dữ liệu xuất ra HTML ( dùng new Map() thay vì {} vì Map() chứa key và value có thể set bằng bất kì kiểu dữ liệu gì) 
    function render() {
        for ( const [root, component] of roots) { // Viết 1 hàm render lọc qua các dữ liệu bên trong roots (root và thành phần(component) bên trong để output)
            const output = component()  
            root.innerHTML = output
        }
    }

    return { // Xuất ra dữ liệu 
        attach(root,component) { //  Viết 1 hàm attach để truyền dữ liệu từ render vào biến roots và render ra ngoài màn hình
            roots.set(component, root)
            render()
        },
        // connect(selector = state => state){
        //     return function(component) {
        //         return function(props, ...args) {
        //             return component(Object.assign({}, props, selector(state), args))
        //         }
        //     }
        // },
        connect(selector = state => state) { // Tạo 1 hàm connect giữa store và view ( chưa biết xuất ra thành phần nào nên để giá trị mặc định state trước đó)
            return component => (props, ...args) => component(Object.assign({}, props, selector(state),args))
            // Dùng arrow function (props và ...args là những thành phần có trong component sau đó viết hàm component truyền hết tất cả các thành phần trên bao gồm selector {selector để như vậy để lấy lại cả giá trị trước của state, khi cập nhật sẽ tự động update})
        },
        dispatch(action, ...args) { // Tạo hàm dispatch để từ view tạo các action để truyền dữ liệu qua reducer -> store -> view
            state = reducer(state, action, args)
            // Hàm reducer sẽ dựa vào action và các args để sửa cái state và gán lại vào state mới -> store sẽ được cập nhật lại
            render()
        }
    }
}

