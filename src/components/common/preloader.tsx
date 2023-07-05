import preloader from '../../assets/images/preloader.svg'

const Preloader :React.FC= () => {
    return (
        <div style={{
            marginTop: '100px',
            marginLeft: '250px',
        }}>
            <img alt="placeholder" src={preloader} />
        </div> 
    )
}

export default Preloader;